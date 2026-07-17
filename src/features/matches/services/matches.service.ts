import { supabase } from '../../../services/supabaseClient'
import type { HomeTeamSummary } from '../../home/types/home.types'
import type { PublicMatchItem, PublicMatchRound, PublicMatchStatus } from '../types/matches.types'

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
  home_team: TeamRelation | TeamRelation[] | null
  away_team: TeamRelation | TeamRelation[] | null
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
  home_team:teams!matches_home_team_id_fkey(id, name, logo_url),
  away_team:teams!matches_away_team_id_fkey(id, name, logo_url)
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

function groupMatchesIntoRounds(matches: MatchRow[]): PublicMatchRound[] {
  const roundsByMatchday = new Map<
    string,
    {
      id: string
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

    if (existingRound) {
      existingRound.matches.push(match)
      existingRound.firstMatchDate = Math.min(existingRound.firstMatchDate, timestamp)
      continue
    }

    roundsByMatchday.set(matchdayId, {
      id: matchdayId,
      matches: [match],
      firstMatchDate: timestamp,
    })
  }

  return [...roundsByMatchday.values()]
    .sort((left, right) => left.firstMatchDate - right.firstMatchDate)
    .map((round, index) => ({
      id: round.id,
      roundNumber: index + 1,
      label: `Fecha ${index + 1}`,
      byeTeam: null,
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
