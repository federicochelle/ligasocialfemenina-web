import { useEffect, useState } from 'react'
import { HomeSectionPlaceholder } from '../components/HomeSectionPlaceholder'
import { MatchTickerSection } from '../components/MatchTickerSection'
import { NewsPortalSection } from '../components/NewsPortalSection'
import { StandingsAndLeadersSection } from '../components/StandingsAndLeadersSection'
import { TeamsSection } from '../components/TeamsSection'
import { getLatestPublishedNews } from '../../news/services/news.service'
import type { PublicNewsItem } from '../../news/types/news.types'
import {
  getHomeMatchTicker,
  getLeadersPreview,
  getStandingsPreview,
  getTeamsPreview,
} from '../services/home.service'
import type {
  StatisticsCategoryPreview,
  PublicStandingRow,
} from '../../statistics/types/statistics.types'
import type { HomeMatchTickerItem, HomeTeamSummary } from '../types/home.types'

export function HomePage() {
  const [matches, setMatches] = useState<HomeMatchTickerItem[]>([])
  const [latestNews, setLatestNews] = useState<PublicNewsItem[]>([])
  const [standingsPreview, setStandingsPreview] = useState<PublicStandingRow[]>([])
  const [leaders, setLeaders] = useState<StatisticsCategoryPreview[]>([])
  const [teams, setTeams] = useState<HomeTeamSummary[]>([])
  const [isMatchesLoading, setIsMatchesLoading] = useState(true)
  const [isNewsLoading, setIsNewsLoading] = useState(true)
  const [isStandingsLoading, setIsStandingsLoading] = useState(true)
  const [isLeadersLoading, setIsLeadersLoading] = useState(true)
  const [isTeamsLoading, setIsTeamsLoading] = useState(true)
  const [hasMatchesError, setHasMatchesError] = useState(false)
  const [hasNewsError, setHasNewsError] = useState(false)

  useEffect(() => {
    let isMounted = true

    void getHomeMatchTicker()
      .then((data) => {
        if (isMounted) {
          setMatches(data)
          setHasMatchesError(false)
        }
      })
      .catch((error: unknown) => {
        console.error(error)
        if (isMounted) {
          setMatches([])
          setHasMatchesError(true)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsMatchesLoading(false)
        }
      })

    void getLatestPublishedNews(5)
      .then((data) => {
        if (isMounted) {
          setLatestNews(data)
          setHasNewsError(false)
        }
      })
      .catch((error: unknown) => {
        console.error(error)
        if (isMounted) {
          setLatestNews([])
          setHasNewsError(true)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsNewsLoading(false)
        }
      })

    void getStandingsPreview()
      .then((data) => {
        if (isMounted) {
          setStandingsPreview(data)
        }
      })
      .catch((error: unknown) => {
        console.error(error)
        if (isMounted) {
          setStandingsPreview([])
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsStandingsLoading(false)
        }
      })

    void getLeadersPreview()
      .then((data) => {
        if (isMounted) {
          setLeaders(data)
        }
      })
      .catch((error: unknown) => {
        console.error(error)
        if (isMounted) {
          setLeaders([])
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLeadersLoading(false)
        }
      })

    void getTeamsPreview()
      .then((data) => {
        if (isMounted) {
          setTeams(data)
        }
      })
      .catch((error: unknown) => {
        console.error(error)
        if (isMounted) {
          setTeams([])
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsTeamsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
      <MatchTickerSection
        matches={matches}
        loading={isMatchesLoading}
        error={hasMatchesError}
      />

      <section className="grid gap-6">
        {isTeamsLoading ? (
          <HomeSectionPlaceholder title="Equipos" />
        ) : (
          <TeamsSection teams={teams} />
        )}

        {isStandingsLoading || isLeadersLoading ? (
          <HomeSectionPlaceholder title="Tabla y lideres" />
        ) : (
          <StandingsAndLeadersSection standings={standingsPreview} leaders={leaders} />
        )}

        {isNewsLoading ? (
          <HomeSectionPlaceholder title="Noticias" />
        ) : (
          <NewsPortalSection articles={latestNews} hasError={hasNewsError} />
        )}
      </section>
    </div>
  )
}
