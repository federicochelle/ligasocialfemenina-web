import { supabase } from '../../../services/supabaseClient'
import type { HomeTeamSummary } from '../../home/types/home.types'
import type {
  PublicMatchDetail,
  PublicMatchItem,
  PublicMatchPlayerStatRow,
  PublicMatchRound,
  PublicMatchStatus,
} from '../types/matches.types'

type TeamRelation = {
  id: string
  name: string
  logo_url: string | null
}

type MatchRow = {
  id: string
  matchday_id: string | null
  match_date: string
  venue: string | null
  field: string | null
  status: PublicMatchStatus | 'live' | 'cancelled'
  home_score: number | null
  away_score: number | null
  matchday:
    | {
        id: string
        round_number: number | null
        bye_team: TeamRelation | TeamRelation[] | null
      }
    | Array<{
        id: string
        round_number: number | null
        bye_team: TeamRelation | TeamRelation[] | null
      }>
    | null
  home_team: TeamRelation | TeamRelation[] | null
  away_team: TeamRelation | TeamRelation[] | null
  home_team_id?: string | null
  away_team_id?: string | null
}

type PlayerRelation = {
  id: string
  name: string
  team_id: string | null
  team: TeamRelation | TeamRelation[] | null
}

type PlayerMatchStatRow = {
  match_id: string
  player_id: string
  points: number | null
  rebounds: number | null
  assists: number | null
  blocks: number | null
  three_pointers: number | null
  player: PlayerRelation | PlayerRelation[] | null
}

const publicMatchesColumns = `
  id,
  matchday_id,
  match_date,
  venue,
  field,
  status,
  home_score,
  away_score,
  matchday:matchdays!matches_matchday_id_fkey(
    id,
    round_number,
    bye_team:teams!matchdays_bye_team_id_fkey(
      id,
      name,
      logo_url
    )
  ),
  home_team:teams!matches_home_team_id_fkey(id, name, logo_url),
  away_team:teams!matches_away_team_id_fkey(id, name, logo_url)
`

const publicMatchDetailColumns = `
  id,
  match_date,
  venue,
  field,
  status,
  home_score,
  away_score,
  home_team_id,
  away_team_id,
  home_team:teams!matches_home_team_id_fkey(id, name, logo_url),
  away_team:teams!matches_away_team_id_fkey(id, name, logo_url)
`

const publicMatchPlayerStatsColumns = `
  match_id,
  player_id,
  points,
  rebounds,
  assists,
  blocks,
  three_pointers,
  player:players(
    id,
    name,
    team_id,
    team:teams(id, name, logo_url)
  )
`

export async function getPublicMatchRounds() {
  const { data, error } = await supabase
    .from('matches')
    .select(publicMatchesColumns)
    .order('match_date', { ascending: true })

  if (error) {
    throw new Error('No pudimos cargar el fixture publico.')
  }

  return groupMatchesIntoRounds((data ?? []) as MatchRow[])
}

export async function getPublicMatchDetail(matchId: string) {
  const [{ data: matchData, error: matchError }, { data: statsData, error: statsError }] =
    await Promise.all([
      supabase.from('matches').select(publicMatchDetailColumns).eq('id', matchId).maybeSingle(),
      supabase
        .from('player_match_stats')
        .select(publicMatchPlayerStatsColumns)
        .eq('match_id', matchId),
    ])

  if (matchError) {
    throw new Error('No pudimos cargar el partido solicitado.')
  }

  if (statsError) {
    throw new Error('No pudimos cargar las estadisticas del partido.')
  }

  if (!matchData) {
    return null
  }

  return mapMatchDetail(matchData as MatchRow, (statsData ?? []) as PlayerMatchStatRow[])
}

function mapMatchRow(match: MatchRow): PublicMatchItem {
  return {
    id: match.id,
    homeTeam: mapTeamSummary(normalizeTeamRelation(match.home_team)) ?? fallbackTeam(),
    awayTeam: mapTeamSummary(normalizeTeamRelation(match.away_team)) ?? fallbackTeam(),
    matchDate: match.match_date,
    venue: match.venue,
    field: match.field,
    status: match.status === 'finished' ? 'finished' : 'scheduled',
    homeScore: match.home_score,
    awayScore: match.away_score,
  }
}

function mapMatchDetail(match: MatchRow, stats: PlayerMatchStatRow[]): PublicMatchDetail {
  const homeTeam = mapTeamSummary(normalizeTeamRelation(match.home_team)) ?? fallbackTeam()
  const awayTeam = mapTeamSummary(normalizeTeamRelation(match.away_team)) ?? fallbackTeam()
  const homePlayers: PublicMatchPlayerStatRow[] = []
  const awayPlayers: PublicMatchPlayerStatRow[] = []

  for (const stat of stats) {
    const player = normalizePlayerRelation(stat.player)

    if (!player || !player.id) {
      continue
    }

    const row = mapPlayerStatRow(stat, player)

    if (player.team_id && player.team_id === match.home_team_id) {
      homePlayers.push(row)
      continue
    }

    if (player.team_id && player.team_id === match.away_team_id) {
      awayPlayers.push(row)
    }
  }

  return {
    match: {
      id: match.id,
      matchDate: match.match_date,
      venue: match.venue,
      field: match.field,
      status: match.status,
      homeScore: match.home_score,
      awayScore: match.away_score,
    },
    homeTeam,
    awayTeam,
    homePlayers: sortPlayerStats(homePlayers),
    awayPlayers: sortPlayerStats(awayPlayers),
  }
}

function groupMatchesIntoRounds(matches: MatchRow[]): PublicMatchRound[] {
  const roundsByMatchday = new Map<
    string,
    {
      id: string
      roundNumber: number | null
      byeTeam: HomeTeamSummary | null
      matches: MatchRow[]
      firstMatchDate: number
    }
  >()

  for (const match of matches) {
    if (!isRenderableMatch(match)) {
      continue
    }

    const matchdayId = match.matchday_id ?? `without-matchday-${match.id}`
    const timestamp = getMatchTimestamp(match.match_date)
    const existingRound = roundsByMatchday.get(matchdayId)
    const matchday = normalizeMatchdayRelation(match.matchday)
    const byeTeam = mapTeamSummary(normalizeTeamRelation(matchday?.bye_team ?? null))

    if (existingRound) {
      existingRound.matches.push(match)
      existingRound.firstMatchDate = Math.min(existingRound.firstMatchDate, timestamp)
      continue
    }

    roundsByMatchday.set(matchdayId, {
      id: matchdayId,
      roundNumber: matchday?.round_number ?? null,
      byeTeam,
      matches: [match],
      firstMatchDate: timestamp,
    })
  }

  return [...roundsByMatchday.values()]
    .sort((left, right) => left.firstMatchDate - right.firstMatchDate)
    .map((round, index) => ({
      id: round.id,
      roundNumber: round.roundNumber ?? index + 1,
      label: `Fecha ${round.roundNumber ?? index + 1}`,
      byeTeam: round.byeTeam,
      matches: round.matches
        .sort((left, right) => getMatchTimestamp(left.match_date) - getMatchTimestamp(right.match_date))
        .map(mapMatchRow),
    }))
}

function isRenderableMatch(match: MatchRow) {
  return match.status === 'scheduled' || match.status === 'finished'
}

function getMatchTimestamp(matchDate: string) {
  const timestamp = new Date(matchDate).getTime()

  return Number.isNaN(timestamp) ? Number.MAX_SAFE_INTEGER : timestamp
}

function normalizeTeamRelation(relation: TeamRelation | TeamRelation[] | null) {
  if (Array.isArray(relation)) {
    return relation[0] ?? null
  }

  return relation
}

function normalizeMatchdayRelation(relation: MatchRow['matchday']) {
  if (Array.isArray(relation)) {
    return relation[0] ?? null
  }

  return relation
}

function normalizePlayerRelation(relation: PlayerRelation | PlayerRelation[] | null) {
  if (Array.isArray(relation)) {
    return relation[0] ?? null
  }

  return relation
}

function mapTeamSummary(team: TeamRelation | null): HomeTeamSummary | null {
  if (!team) {
    return null
  }

  return {
    id: team.id,
    name: team.name?.trim() || 'Equipo',
    logoUrl: team.logo_url ?? null,
  }
}

function fallbackTeam(): HomeTeamSummary {
  return {
    id: '',
    name: 'Equipo',
    logoUrl: null,
  }
}

function mapPlayerStatRow(stat: PlayerMatchStatRow, player: PlayerRelation): PublicMatchPlayerStatRow {
  return {
    playerId: player.id,
    playerName: player.name?.trim() || 'Jugadora',
    points: getNumericValue(stat.points),
    rebounds: getNumericValue(stat.rebounds),
    assists: getNumericValue(stat.assists),
    triples: getNumericValue(stat.three_pointers),
    blocks: getNumericValue(stat.blocks),
  }
}

function sortPlayerStats(rows: PublicMatchPlayerStatRow[]) {
  return [...rows].sort((left, right) => {
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
