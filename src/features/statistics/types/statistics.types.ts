export type StatisticsCategory =
  | 'points'
  | 'rebounds'
  | 'assists'
  | 'triples'
  | 'blocks'

export type StatisticsCategoryOption = {
  key: StatisticsCategory
  label: string
}

export type PlayerRankingRow = {
  playerId: string
  playerName: string
  teamId: string | null
  teamName: string
  teamLogoUrl: string | null
  gamesPlayed: number
  total: number
  average: number
  position: number
}

export type StatisticsLeaderItem = PlayerRankingRow & {
  category: StatisticsCategory
  label: string
}

export type StatisticsCategoryPreview = {
  category: StatisticsCategory
  label: string
  rows: PlayerRankingRow[]
}

export type PublicStandingRow = {
  rank: number
  teamId: string
  teamName: string
  gamesPlayed: number
  wins: number
  losses: number
  pointsFor: number
  pointsAgainst: number
  pointDifferential: number
  standingsPoints: number
  teamLogoUrl: string | null
}

export const statisticsCategoryOptions: StatisticsCategoryOption[] = [
  { key: 'points', label: 'Puntos' },
  { key: 'rebounds', label: 'Rebotes' },
  { key: 'assists', label: 'Asistencias' },
  { key: 'triples', label: 'Triples' },
  { key: 'blocks', label: 'Tapones' },
]
