import { supabase } from '../../../services/supabaseClient'
import type {
  PlayerRankingRow,
  PublicStandingRow,
  StatisticsCategory,
  StatisticsCategoryPreview,
  StatisticsLeaderItem,
} from '../types/statistics.types'
import { statisticsCategoryOptions } from '../types/statistics.types'

type TeamRelation = {
  id: string
  name: string
  logo_url: string | null
}

type PlayerRow = {
  id: string
  name: string
  team_id: string | null
  team: TeamRelation | TeamRelation[] | null
}

type PlayerStatRow = Record<string, unknown> & {
  match_id?: string | null
  player_id?: string | null
  player?: { id: string } | Array<{ id: string }> | null
}

type MatchIdRow = {
  id: string
}

type StandingMatchRow = {
  home_team_id: string
  away_team_id: string
  home_score: number | null
  away_score: number | null
}

type TeamRow = {
  id: string
  name: string
  logo_url: string | null
}

type StandingAccumulator = Omit<
  PublicStandingRow,
  'rank' | 'pointDifferential' | 'standingsPoints'
>

const playerSelect = `
  id,
  name,
  team_id,
  team:teams(id, name, logo_url)
`

const statisticValueCandidates: Record<StatisticsCategory, string[]> = {
  points: ['points'],
  rebounds: ['rebounds'],
  assists: ['assists'],
  triples: ['triples', 'three_points_made', 'three_pointers_made', 'three_points', 'triples_made'],
  blocks: ['blocks', 'block_shots'],
}

function buildPublicReadError(
  error: { code?: string; message?: string } | null,
  table: string,
  fallbackMessage: string,
) {
  const needsPublicSelect =
    error?.code === '42501' ||
    error?.message?.includes('permission denied') ||
    error?.message?.includes('row-level security') ||
    error?.message?.includes('JWT')

  if (needsPublicSelect) {
    return new Error(`${fallbackMessage} La tabla "${table}" necesita SELECT publico.`)
  }

  return new Error(fallbackMessage)
}

function normalizeTeamRelation(team: TeamRelation | TeamRelation[] | null) {
  return Array.isArray(team) ? (team[0] ?? null) : team
}

function normalizePlayerId(row: PlayerStatRow) {
  if (typeof row.player_id === 'string' && row.player_id.length > 0) {
    return row.player_id
  }

  if (Array.isArray(row.player)) {
    return row.player[0]?.id ?? null
  }

  return row.player?.id ?? null
}

function getNumericValue(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

function getStatValue(row: PlayerStatRow, category: StatisticsCategory) {
  for (const key of statisticValueCandidates[category]) {
    const value = row[key]

    if (typeof value === 'number' && Number.isFinite(value)) {
      return value
    }
  }

  return 0
}

async function loadActivePlayers() {
  const { data, error } = await supabase
    .from('players')
    .select(playerSelect)
    .eq('active', true)
    .order('name', { ascending: true })

  if (error) {
    throw buildPublicReadError(
      error,
      'players',
      'No pudimos cargar las jugadoras activas para las estadisticas publicas.',
    )
  }

  return (data ?? []) as PlayerRow[]
}

async function loadFinishedMatchIds() {
  const { data, error } = await supabase
    .from('matches')
    .select('id')
    .eq('status', 'finished')

  if (error) {
    throw buildPublicReadError(
      error,
      'matches',
      'No pudimos cargar los partidos finalizados para las estadisticas publicas.',
    )
  }

  return ((data ?? []) as MatchIdRow[]).map((row) => row.id)
}

async function loadPlayerStats(matchIds: string[]) {
  if (matchIds.length === 0) {
    return [] as PlayerStatRow[]
  }

  const { data, error } = await supabase
    .from('player_match_stats')
    .select('*, player:players(id)')
    .in('match_id', matchIds)

  if (error) {
    throw buildPublicReadError(
      error,
      'player_match_stats',
      'No pudimos cargar las estadisticas de jugadoras para la web publica.',
    )
  }

  return (data ?? []) as PlayerStatRow[]
}

async function loadStatisticsDataset() {
  const [players, finishedMatchIds] = await Promise.all([
    loadActivePlayers(),
    loadFinishedMatchIds(),
  ])
  const stats = await loadPlayerStats(finishedMatchIds)

  return {
    players,
    stats,
  }
}

function buildPlayerRankings(
  players: PlayerRow[],
  stats: PlayerStatRow[],
  category: StatisticsCategory,
) {
  const totalsByPlayer = new Map<
    string,
    {
      total: number
      matchIds: Set<string>
    }
  >()

  for (const row of stats) {
    const playerId = normalizePlayerId(row)
    const matchId = typeof row.match_id === 'string' ? row.match_id : null

    if (!playerId || !matchId) {
      continue
    }

    const existing = totalsByPlayer.get(playerId)
    const currentValue = getStatValue(row, category)

    if (existing) {
      existing.total += currentValue
      existing.matchIds.add(matchId)
      continue
    }

    totalsByPlayer.set(playerId, {
      total: currentValue,
      matchIds: new Set([matchId]),
    })
  }

  return players
    .map((player) => {
      const totals = totalsByPlayer.get(player.id)
      const team = normalizeTeamRelation(player.team)
      const gamesPlayed = totals?.matchIds.size ?? 0
      const total = totals?.total ?? 0
      const average = gamesPlayed > 0 ? total / gamesPlayed : 0

      return {
        playerId: player.id,
        playerName: player.name,
        teamId: player.team_id,
        teamName: team?.name ?? 'Sin equipo',
        teamLogoUrl: team?.logo_url ?? null,
        gamesPlayed,
        total,
        average,
        position: 0,
      } satisfies PlayerRankingRow
    })
    .sort((left, right) => {
      if (right.total !== left.total) {
        return right.total - left.total
      }

      if (right.average !== left.average) {
        return right.average - left.average
      }

      return left.playerName.localeCompare(right.playerName, 'es')
    })
    .map((row, index) => ({
      ...row,
      position: index + 1,
    }))
}

export async function getPlayerRankings(category: StatisticsCategory) {
  const { players, stats } = await loadStatisticsDataset()

  return buildPlayerRankings(players, stats, category)
}

export async function getTopPlayersByCategory(category: StatisticsCategory, limit: number) {
  const rankings = await getPlayerRankings(category)

  return rankings.slice(0, limit)
}

export async function getHomeLeaders() {
  const { players, stats } = await loadStatisticsDataset()

  return statisticsCategoryOptions.map((option) => {
    const leader = buildPlayerRankings(players, stats, option.key)[0]

    return {
      category: option.key,
      label: option.label,
      playerId: leader?.playerId ?? '',
      playerName: leader?.playerName ?? 'Sin jugadoras',
      teamId: leader?.teamId ?? null,
      teamName: leader?.teamName ?? 'Sin equipo',
      teamLogoUrl: leader?.teamLogoUrl ?? null,
      gamesPlayed: leader?.gamesPlayed ?? 0,
      total: leader?.total ?? 0,
      average: leader?.average ?? 0,
      position: leader?.position ?? 0,
    } satisfies StatisticsLeaderItem
  })
}

export async function getHomeLeaderBoards(limit = 5) {
  const { players, stats } = await loadStatisticsDataset()

  return statisticsCategoryOptions.map((option) => ({
    category: option.key,
    label: option.label,
    rows: buildPlayerRankings(players, stats, option.key).slice(0, limit),
  })) satisfies StatisticsCategoryPreview[]
}

export async function getStandings() {
  const [{ data: teams, error: teamsError }, { data: matches, error: matchesError }] =
    await Promise.all([
      supabase.from('teams').select('id, name, logo_url').order('name', { ascending: true }),
      supabase
        .from('matches')
        .select('home_team_id, away_team_id, home_score, away_score')
        .eq('status', 'finished'),
    ])

  if (teamsError) {
    throw buildPublicReadError(
      teamsError,
      'teams',
      'No pudimos cargar los equipos para la tabla de posiciones.',
    )
  }

  if (matchesError) {
    throw buildPublicReadError(
      matchesError,
      'matches',
      'No pudimos cargar los partidos para la tabla de posiciones.',
    )
  }

  const standingsByTeam = new Map<string, StandingAccumulator>(
    ((teams ?? []) as TeamRow[]).map((team) => [
      team.id,
      {
        teamId: team.id,
        teamName: team.name,
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        teamLogoUrl: team.logo_url,
      },
    ]),
  )

  for (const match of (matches ?? []) as StandingMatchRow[]) {
    const home = standingsByTeam.get(match.home_team_id)
    const away = standingsByTeam.get(match.away_team_id)

    if (!home || !away) {
      continue
    }

    const homeScore = getNumericValue(match.home_score)
    const awayScore = getNumericValue(match.away_score)

    home.gamesPlayed += 1
    away.gamesPlayed += 1
    home.pointsFor += homeScore
    home.pointsAgainst += awayScore
    away.pointsFor += awayScore
    away.pointsAgainst += homeScore

    if (homeScore > awayScore) {
      home.wins += 1
      away.losses += 1
      continue
    }

    if (awayScore > homeScore) {
      away.wins += 1
      home.losses += 1
      continue
    }

    home.losses += 1
    away.losses += 1
  }

  return Array.from(standingsByTeam.values())
    .map((team) => ({
      ...team,
      rank: 0,
      pointDifferential: team.pointsFor - team.pointsAgainst,
      standingsPoints: team.wins * 2 + team.losses,
    }))
    .sort((left, right) => {
      if (right.standingsPoints !== left.standingsPoints) {
        return right.standingsPoints - left.standingsPoints
      }

      if (right.pointDifferential !== left.pointDifferential) {
        return right.pointDifferential - left.pointDifferential
      }

      if (right.pointsFor !== left.pointsFor) {
        return right.pointsFor - left.pointsFor
      }

      return left.teamName.localeCompare(right.teamName, 'es')
    })
    .map((team, index) => ({
      ...team,
      rank: index + 1,
    })) satisfies PublicStandingRow[]
}
