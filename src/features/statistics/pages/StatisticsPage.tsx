import { useEffect, useState } from 'react'
import { PageIntro } from '../../../components/placeholders/PageIntro'
import { LeaderRankingsPanel } from '../../home/components/LeaderRankingsPanel'
import { getPlayerRankings } from '../services/statistics.service'
import {
  type PlayerRankingRow,
  type StatisticsCategory,
} from '../types/statistics.types'

export function StatisticsPage() {
  const [activeCategory, setActiveCategory] = useState<StatisticsCategory>('points')
  const [rankings, setRankings] = useState<PlayerRankingRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    setIsLoading(true)
    setErrorMessage(null)

    void getPlayerRankings(activeCategory)
      .then((data) => {
        if (isMounted) {
          setRankings(data)
        }
      })
      .catch((error: unknown) => {
        console.error(error)

        if (isMounted) {
          setRankings([])
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'No pudimos cargar las estadisticas publicas.',
          )
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [activeCategory])

  return (
    <section className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
      <div className="rounded-[1.8rem] border border-[var(--color-line)] bg-white px-5 py-6 shadow-[0_18px_50px_rgba(5,12,31,0.12)] min-[901px]:px-8 min-[901px]:py-8">
        <PageIntro
          eyebrow="Estadisticas"
          title="Lideres de la Liga Social Femenina."
          description=""
        />

        <LeaderRankingsPanel
          title="Lideres de la liga"
          activeCategory={activeCategory}
          availableCategories={['points', 'rebounds', 'assists', 'triples', 'blocks']}
          rows={rankings}
          onCategoryChange={setActiveCategory}
          loading={isLoading}
          errorMessage={errorMessage}
          emptyMessage="No hay jugadoras activas disponibles."
          showTeamNameOnDesktop={false}
          className="mt-6 max-[640px]:-mx-4 rounded-[1.8rem] shadow-[0_18px_50px_rgba(5,12,31,0.10)]"
        />
      </div>
    </section>
  )
}
