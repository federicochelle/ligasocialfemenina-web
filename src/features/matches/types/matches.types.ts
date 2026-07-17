import type { HomeTeamSummary } from '../../home/types/home.types'

export type PublicMatchStatus = 'scheduled' | 'finished'

export type PublicMatchItem = {
  id: string
  homeTeam: HomeTeamSummary
  awayTeam: HomeTeamSummary
  matchDate: string
  venue: string | null
  field: string | null
  status: PublicMatchStatus
  homeScore: number | null
  awayScore: number | null
}

export type PublicMatchRound = {
  id: string
  roundNumber: number | null
  label: string
  byeTeam: HomeTeamSummary | null
  matches: PublicMatchItem[]
}
