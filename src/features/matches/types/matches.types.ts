import type { HomeTeamSummary } from '../../home/types/home.types'

export type PublicMatchStatus = 'scheduled' | 'finished' | 'live' | 'cancelled'

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

export type PublicMatchPlayerStatRow = {
  playerId: string
  playerName: string
  points: number
  rebounds: number
  assists: number
  triples: number
  blocks: number
}

export type PublicMatchDetail = {
  match: {
    id: string
    matchDate: string
    venue: string | null
    field: string | null
    status: PublicMatchStatus
    homeScore: number | null
    awayScore: number | null
  }
  homeTeam: HomeTeamSummary
  awayTeam: HomeTeamSummary
  homePlayers: PublicMatchPlayerStatRow[]
  awayPlayers: PublicMatchPlayerStatRow[]
}
