import type { HomeTeamSummary } from '../../home/types/home.types'

export type PublicTeamSeasonStats = {
  seasonLabel: string | null
  rank: number | null
  gamesPlayed: number | null
  wins: number | null
  losses: number | null
}

export type PublicTeamPlayerSeasonRow = {
  playerId: string
  playerName: string
  gamesPlayed: number
  points: number
  rebounds: number
  assists: number
  triples: number
  blocks: number
}

export type PublicTeamDetail = {
  team: HomeTeamSummary
  seasonStats: PublicTeamSeasonStats
  players: PublicTeamPlayerSeasonRow[]
}
