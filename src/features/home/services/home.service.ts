import { supabase } from '../../../services/supabaseClient'
import { getHomeLeaderBoards, getStandings } from '../../statistics/services/statistics.service'
import type {
  HomeMatchPreview,
  HomeMatchTickerItem,
  HomeTeamRelation,
  HomeTeamSummary,
  HomeTickerTeam,
} from '../types/home.types'

type MatchRow = {
  id: string
  match_date: string
  matchday_id: string | null
  venue: string | null
  field: string | null
  status: 'scheduled' | 'live' | 'finished' | 'cancelled'
  home_score: number | null
  away_score: number | null
  season_label: string | null
  matchday: { round_number: number | null } | { round_number: number | null }[] | null
  home_team: HomeTeamRelation | HomeTeamRelation[] | null
  away_team: HomeTeamRelation | HomeTeamRelation[] | null
}

type TeamRow = {
  id: string
  name: string
  logo_url: string | null
}

const homeMatchColumns = `
  id,
  match_date,
  matchday_id,
  venue,
  field,
  status,
  home_score,
  away_score,
  season_label,
  matchday:matchdays!matches_matchday_id_fkey(round_number),
  home_team:teams!matches_home_team_id_fkey(id, name, logo_url),
  away_team:teams!matches_away_team_id_fkey(id, name, logo_url)
`

export async function getHomeMatchTicker() {
  const { data, error } = await supabase
    .from('matches')
    .select(homeMatchColumns)
    .in('status', ['scheduled', 'finished'])
    .order('match_date', { ascending: true })

  if (error) {
    throw new Error('No pudimos obtener los partidos destacados del inicio.')
  }

  const tickerMatches = ((data ?? []) as MatchRow[])
    .map(mapMatchTickerRow)
    .filter((match) => match.roundNumber !== null && match.roundNumber >= 1 && match.roundNumber <= 5)

  return tickerMatches satisfies HomeMatchTickerItem[]
}

export async function getNextScheduledMatch() {
  const { data, error } = await supabase
    .from('matches')
    .select(homeMatchColumns)
    .eq('status', 'scheduled')
    .order('match_date', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw new Error('No pudimos obtener el proximo partido.')
  }

  if (!data) {
    return null
  }

  return mapMatchRow(data satisfies MatchRow) satisfies HomeMatchPreview
}

export async function getRecentResults() {
  const { data, error } = await supabase
    .from('matches')
    .select(homeMatchColumns)
    .eq('status', 'finished')
    .order('match_date', { ascending: false })
    .limit(3)

  if (error) {
    throw new Error('No pudimos obtener los ultimos resultados.')
  }

  return (data satisfies MatchRow[]).map(mapMatchRow) satisfies HomeMatchPreview[]
}

export async function getStandingsPreview() {
  return getStandings()
}

export async function getLeadersPreview() {
  return getHomeLeaderBoards()
}

export async function getTeamsPreview() {
  const { data, error } = await supabase
    .from('teams')
    .select('id, name, logo_url')
    .eq('active', true)
    .order('name', { ascending: true })

  if (error) {
    throw new Error('No pudimos obtener los equipos.')
  }

  return (data satisfies TeamRow[]).map(mapTeamSummary)
}

function mapMatchRow(match: MatchRow) {
  const homeTeam = normalizeTeamRelation(match.home_team)
  const awayTeam = normalizeTeamRelation(match.away_team)

  return {
    id: match.id,
    matchDate: match.match_date,
    venue: match.venue,
    field: match.field,
    seasonLabel: match.season_label,
    homeTeam: mapTeamSummary(homeTeam),
    awayTeam: mapTeamSummary(awayTeam),
    homeScore: match.home_score,
    awayScore: match.away_score,
    status: match.status,
  }
}

function mapMatchTickerRow(match: MatchRow): HomeMatchTickerItem {
  const homeTeam = normalizeTeamRelation(match.home_team)
  const awayTeam = normalizeTeamRelation(match.away_team)
  const matchday = normalizeMatchdayRelation(match.matchday)

  return {
    id: match.id,
    status: match.status,
    matchDate: match.match_date,
    roundNumber: matchday?.round_number ?? null,
    venue: match.venue,
    field: match.field,
    seasonLabel: match.season_label,
    homeScore: match.home_score,
    awayScore: match.away_score,
    homeTeam: mapTickerTeam(homeTeam),
    awayTeam: mapTickerTeam(awayTeam),
  }
}

function normalizeTeamRelation(relation: HomeTeamRelation | HomeTeamRelation[] | null) {
  if (Array.isArray(relation)) {
    return relation[0] ?? null
  }

  return relation
}

function normalizeMatchdayRelation(
  relation: { round_number: number | null } | { round_number: number | null }[] | null,
) {
  if (Array.isArray(relation)) {
    return relation[0] ?? null
  }

  return relation
}

function mapTeamSummary(team: HomeTeamRelation | TeamRow | null | undefined): HomeTeamSummary {
  return {
    id: team?.id ?? '',
    name: team?.name ?? 'Equipo',
    logoUrl: team?.logo_url ?? null,
  }
}

function mapTickerTeam(team: HomeTeamRelation | null | undefined): HomeTickerTeam {
  const name = team?.name ?? 'Equipo'

  return {
    id: team?.id ?? '',
    name,
    abbreviation: buildTeamAbbreviation(name),
    logoUrl: team?.logo_url ?? null,
  }
}

function buildTeamAbbreviation(name: string) {
  const normalizedName = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

  if (!normalizedName) {
    return 'EQU'
  }

  const parts = normalizedName.split(/\s+/).filter(Boolean)

  if (parts.length >= 2) {
    return parts
      .slice(0, 3)
      .map((part) => part[0] ?? '')
      .join('')
      .toUpperCase()
      .slice(0, 3)
  }

  return normalizedName.replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase() || 'EQU'
}
