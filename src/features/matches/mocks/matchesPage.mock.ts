import type { HomeTeamSummary } from '../../home/types/home.types'

export type PublicMatchItem = {
  id: string
  homeTeam: HomeTeamSummary
  awayTeam: HomeTeamSummary
  matchDate: string
  venue: string
  status: 'scheduled' | 'finished'
  homeScore: number | null
  awayScore: number | null
}

export type PublicMatchRound = {
  id: string
  label: string
  matches: PublicMatchItem[]
}

const teams: Record<string, HomeTeamSummary> = {
  malvin: {
    id: 'malvin',
    name: 'Malvin',
    logoUrl:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=300&q=80',
  },
  yale: {
    id: 'yale',
    name: 'Yale',
    logoUrl:
      'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=300&q=80',
  },
  aguada: {
    id: 'aguada',
    name: 'Aguada',
    logoUrl:
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=300&q=80',
  },
  welcome: {
    id: 'welcome',
    name: 'Welcome',
    logoUrl:
      'https://images.unsplash.com/photo-1505666287802-931dc83a2f4d?auto=format&fit=crop&w=300&q=80',
  },
  capitol: {
    id: 'capitol',
    name: 'Capitol',
    logoUrl:
      'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=300&q=80',
  },
  bohemios: {
    id: 'bohemios',
    name: 'Bohemios',
    logoUrl:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=300&q=80',
  },
}

export const matchesPageMock: PublicMatchRound[] = [
  {
    id: 'fecha-1',
    label: 'Fecha 1',
    matches: [
      {
        id: 'f1-m1',
        homeTeam: teams.malvin,
        awayTeam: teams.yale,
        matchDate: '2026-07-10T20:30:00.000Z',
        venue: 'Cancha Malvin',
        status: 'scheduled',
        homeScore: null,
        awayScore: null,
      },
      {
        id: 'f1-m2',
        homeTeam: teams.aguada,
        awayTeam: teams.welcome,
        matchDate: '2026-07-11T18:00:00.000Z',
        venue: 'Gimnasio Aguada',
        status: 'scheduled',
        homeScore: null,
        awayScore: null,
      },
      {
        id: 'f1-m3',
        homeTeam: teams.capitol,
        awayTeam: teams.bohemios,
        matchDate: '2026-07-11T20:15:00.000Z',
        venue: 'Cancha Capitol',
        status: 'scheduled',
        homeScore: null,
        awayScore: null,
      },
    ],
  },
  {
    id: 'fecha-2',
    label: 'Fecha 2',
    matches: [
      {
        id: 'f2-m1',
        homeTeam: teams.yale,
        awayTeam: teams.capitol,
        matchDate: '2026-07-12T19:30:00.000Z',
        venue: 'Yale Club',
        status: 'scheduled',
        homeScore: null,
        awayScore: null,
      },
      {
        id: 'f2-m2',
        homeTeam: teams.bohemios,
        awayTeam: teams.malvin,
        matchDate: '2026-07-12T21:00:00.000Z',
        venue: 'Bohemios',
        status: 'scheduled',
        homeScore: null,
        awayScore: null,
      },
      {
        id: 'f2-m3',
        homeTeam: teams.welcome,
        awayTeam: teams.aguada,
        matchDate: '2026-07-13T19:45:00.000Z',
        venue: 'Estadio Welcome',
        status: 'scheduled',
        homeScore: null,
        awayScore: null,
      },
    ],
  },
  {
    id: 'fecha-3',
    label: 'Fecha 3',
    matches: [
      {
        id: 'f3-m1',
        homeTeam: teams.welcome,
        awayTeam: teams.malvin,
        matchDate: '2026-07-06T20:15:00.000Z',
        venue: 'Estadio Welcome',
        status: 'finished',
        homeScore: 62,
        awayScore: 71,
      },
      {
        id: 'f3-m2',
        homeTeam: teams.bohemios,
        awayTeam: teams.aguada,
        matchDate: '2026-07-05T18:45:00.000Z',
        venue: 'Bohemios',
        status: 'finished',
        homeScore: 68,
        awayScore: 66,
      },
      {
        id: 'f3-m3',
        homeTeam: teams.capitol,
        awayTeam: teams.malvin,
        matchDate: '2026-07-04T20:30:00.000Z',
        venue: 'Cancha Capitol',
        status: 'finished',
        homeScore: 59,
        awayScore: 74,
      },
    ],
  },
  {
    id: 'fecha-4',
    label: 'Fecha 4',
    matches: [
      {
        id: 'f4-m1',
        homeTeam: teams.yale,
        awayTeam: teams.welcome,
        matchDate: '2026-07-03T19:15:00.000Z',
        venue: 'Yale Club',
        status: 'finished',
        homeScore: 77,
        awayScore: 73,
      },
      {
        id: 'f4-m2',
        homeTeam: teams.aguada,
        awayTeam: teams.capitol,
        matchDate: '2026-07-02T21:00:00.000Z',
        venue: 'Gimnasio Aguada',
        status: 'finished',
        homeScore: 70,
        awayScore: 58,
      },
      {
        id: 'f4-m3',
        homeTeam: teams.bohemios,
        awayTeam: teams.yale,
        matchDate: '2026-07-01T20:00:00.000Z',
        venue: 'Bohemios',
        status: 'finished',
        homeScore: 64,
        awayScore: 69,
      },
    ],
  },
]
