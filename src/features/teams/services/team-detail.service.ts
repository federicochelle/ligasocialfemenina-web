import { supabase } from '../../../services/supabaseClient'
import type { HomeTeamSummary } from '../../home/types/home.types'
import { getStandings } from '../../statistics/services/statistics.service'
import type { PublicTeamDetail, PublicTeamPlayerSeasonRow } from '../types/team-detail.types'

type TeamRow = {
  id: string
  name: string
  logo_url: string | null
}

type PlayerRow = {
  id: string
  name: string
}

type FinishedMatchRow = {
  id: string
  season_label: string | null
}

type TeamSeasonRow = {
  season_label: string | null
}

type PlayerMatchStatRow = {
  match_id: string
  player_id: string
  points: number | null
  rebounds: number | null
  assists: number | null
  blocks: number | null
  three_pointers: number | null
}

const teamSelect = 'id, name, logo_url'
const teamPlayerSelect = 'id, name'
const teamMatchStatsSelect = 'match_id, player_id, points, rebounds, assists, blocks, three_pointers'

export async function getPublicTeamDetail(teamId: string) {
  const [{ data: teamData, error: teamError }, standings] = await Promise.all([
    supabase.from('teams').select(teamSelect).eq('id', teamId).maybeSingle(),
    getStandings(),
  ])

  if (teamError) {
    throw new Error('No pudimos cargar el equipo solicitado.')
  }

  if (!teamData) {
    return null
  }

  const [
    { data: playersData, error: playersError },
    { data: finishedMatchesData, error: matchesError },
    { data: seasonData, error: seasonError },
  ] = await Promise.all([
    supabase
      .from('players')
      .select(teamPlayerSelect)
      .eq('team_id', teamId)
      .eq('active', true)
      .order('name', { ascending: true }),
    supabase
      .from('matches')
      .select('id, season_label')
      .eq('status', 'finished')
      .or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`)
      .order('match_date', { ascending: false }),
    supabase
      .from('matches')
      .select('season_label')
      .or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`)
      .order('match_date', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ])

  if (playersError) {
    throw new Error('No pudimos cargar las jugadoras del equipo.')
  }

  if (matchesError) {
    throw new Error('No pudimos cargar los partidos finalizados del equipo.')
  }

  if (seasonError) {
    throw new Error('No pudimos cargar la temporada del equipo.')
  }

  const finishedMatches = (finishedMatchesData ?? []) as FinishedMatchRow[]
  const finishedMatchIds = finishedMatches.map((match) => match.id)
  const seasonLabel =
    finishedMatches.find((match) => match.season_label)?.season_label ??
    ((seasonData as TeamSeasonRow | null)?.season_label ?? null)
  const players = (playersData ?? []) as PlayerRow[]

  const playerIds = players.map((player) => player.id)
  const { data: statsData, error: statsError } =
    finishedMatchIds.length > 0 && playerIds.length > 0
      ? await supabase
          .from('player_match_stats')
          .select(teamMatchStatsSelect)
          .in('match_id', finishedMatchIds)
          .in('player_id', playerIds)
      : { data: [], error: null }

  if (statsError) {
    throw new Error('No pudimos cargar las estadisticas del equipo.')
  }

  const standingsRow = standings.find((row) => row.teamId === teamId) ?? null

  return {
    team: mapTeamSummary(teamData as TeamRow),
    seasonStats: {
      seasonLabel,
      rank: standingsRow?.rank ?? null,
      gamesPlayed: standingsRow?.gamesPlayed ?? null,
      wins: standingsRow?.wins ?? null,
      losses: standingsRow?.losses ?? null,
    },
    players: buildPlayerRows(players, (statsData ?? []) as PlayerMatchStatRow[]),
  } satisfies PublicTeamDetail
}

function mapTeamSummary(team: TeamRow): HomeTeamSummary {
  return {
    id: team.id,
    name: team.name?.trim() || 'Equipo',
    logoUrl: team.logo_url ?? null,
  }
}

function buildPlayerRows(players: PlayerRow[], stats: PlayerMatchStatRow[]) {
  const totalsByPlayer = new Map<
    string,
    {
      gamesPlayed: Set<string>
      points: number
      rebounds: number
      assists: number
      triples: number
      blocks: number
    }
  >()

  for (const stat of stats) {
    const existing = totalsByPlayer.get(stat.player_id)
    const matchId = stat.match_id

    if (existing) {
      existing.gamesPlayed.add(matchId)
      existing.points += getNumericValue(stat.points)
      existing.rebounds += getNumericValue(stat.rebounds)
      existing.assists += getNumericValue(stat.assists)
      existing.triples += getNumericValue(stat.three_pointers)
      existing.blocks += getNumericValue(stat.blocks)
      continue
    }

    totalsByPlayer.set(stat.player_id, {
      gamesPlayed: new Set([matchId]),
      points: getNumericValue(stat.points),
      rebounds: getNumericValue(stat.rebounds),
      assists: getNumericValue(stat.assists),
      triples: getNumericValue(stat.three_pointers),
      blocks: getNumericValue(stat.blocks),
    })
  }

  return players
    .map((player) => {
      const totals = totalsByPlayer.get(player.id)
      const gamesPlayed = totals?.gamesPlayed.size ?? 0

      return {
        playerId: player.id,
        playerName: player.name,
        gamesPlayed,
        points: gamesPlayed > 0 ? totals!.points / gamesPlayed : 0,
        rebounds: gamesPlayed > 0 ? totals!.rebounds / gamesPlayed : 0,
        assists: gamesPlayed > 0 ? totals!.assists / gamesPlayed : 0,
        triples: gamesPlayed > 0 ? totals!.triples / gamesPlayed : 0,
        blocks: gamesPlayed > 0 ? totals!.blocks / gamesPlayed : 0,
      } satisfies PublicTeamPlayerSeasonRow
    })
    .sort((left, right) => {
      if (right.points !== left.points) {
        return right.points - left.points
      }

      if (right.rebounds !== left.rebounds) {
        return right.rebounds - left.rebounds
      }

      if (right.assists !== left.assists) {
        return right.assists - left.assists
      }

      return left.playerName.localeCompare(right.playerName, 'es')
    })
}

function getNumericValue(value: number | null) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}
