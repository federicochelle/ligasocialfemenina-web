export type HomeTeamSummary = {
  id: string
  name: string
  logoUrl: string | null
}

export type HomeTickerTeam = {
  id: string
  name: string
  abbreviation: string
  logoUrl: string | null
}

export type HomeMatchPreview = {
  id: string
  matchDate: string
  venue: string | null
  homeTeam: HomeTeamSummary
  awayTeam: HomeTeamSummary
  homeScore: number | null
  awayScore: number | null
  status: 'scheduled' | 'live' | 'finished' | 'cancelled'
}

export type HomeMatchTickerItem = {
  id: string
  status: 'scheduled' | 'live' | 'finished' | 'cancelled'
  matchDate: string
  roundNumber: number | null
  venue: string | null
  field: string | null
  seasonLabel: string | null
  homeScore: number | null
  awayScore: number | null
  homeTeam: HomeTickerTeam
  awayTeam: HomeTickerTeam
}

export type HomeTeamRelation = {
  id: string
  name: string
  logo_url: string | null
}
