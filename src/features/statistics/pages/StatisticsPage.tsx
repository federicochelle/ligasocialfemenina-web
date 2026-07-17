import { useEffect, useState } from 'react'
import { PageIntro } from '../../../components/placeholders/PageIntro'
import { HomeSectionEmptyState } from '../../home/components/HomeSectionEmptyState'
import { TeamLogo } from '../../home/components/TeamLogo'
import { getPlayerRankings } from '../services/statistics.service'
import {
  statisticsCategoryOptions,
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

        <div className="mt-6 flex flex-wrap gap-2">
          {statisticsCategoryOptions.map((tab) => {
            const isActive = activeCategory === tab.key

            return (
              <button
                key={tab.key}
                type="button"
                className={[
                  'rounded-full border px-4 py-2.5 text-sm font-extrabold tracking-[0.08em] uppercase transition-colors duration-200',
                  isActive
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                    : 'border-[var(--color-line)] bg-white text-[var(--color-primary)] hover:bg-[rgba(11,27,69,0.04)]',
                ].join(' ')}
                onClick={() => setActiveCategory(tab.key)}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <section className="mt-6 overflow-hidden rounded-[1.8rem] border border-[var(--color-line)] bg-white shadow-[0_18px_50px_rgba(5,12,31,0.10)]">
          <header className="bg-[var(--color-primary)] px-5 py-3 min-[901px]:px-6">
            <h2 className="text-[0.88rem] font-extrabold tracking-[0.16em] text-white uppercase">
              {statisticsCategoryOptions.find((tab) => tab.key === activeCategory)?.label}
            </h2>
          </header>

          {isLoading ? (
            <div className="grid min-h-52 place-items-center px-5 py-8 text-sm font-semibold text-[var(--color-text-muted)]">
              Cargando estadisticas...
            </div>
          ) : errorMessage ? (
            <div className="grid min-h-52 place-items-center px-5 py-8 text-center">
              <p className="max-w-xl text-sm font-semibold text-[var(--color-accent)]">
                {errorMessage}
              </p>
            </div>
          ) : rankings.length === 0 ? (
            <div className="grid min-h-52 place-items-center px-5 py-8">
              <HomeSectionEmptyState message="No hay jugadoras activas disponibles." />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[64rem]">
                <div className="grid grid-cols-[3rem_minmax(14rem,1.3fr)_minmax(12rem,1fr)_4.5rem_5rem_5.5rem] items-center gap-3 border-b border-[var(--color-line)] bg-[rgba(11,27,69,0.04)] px-5 py-3 text-[0.74rem] font-extrabold tracking-[0.14em] text-[var(--color-text-muted)] uppercase min-[901px]:px-6">
                  <span>#</span>
                  <span>Jugadora</span>
                  <span>Equipo</span>
                  <span className="text-center">PJ</span>
                  <span className="text-center">Total</span>
                  <span className="text-center">Prom.</span>
                </div>

                {rankings.map((leader) => (
                  <div
                    key={`${activeCategory}-${leader.playerId}`}
                    className="grid grid-cols-[3rem_minmax(14rem,1.3fr)_minmax(12rem,1fr)_4.5rem_5rem_5.5rem] items-center gap-3 border-b border-[rgba(11,27,69,0.06)] px-5 py-3 transition-colors duration-200 hover:bg-[rgba(11,27,69,0.04)] min-[901px]:px-6"
                  >
                    <span className="text-sm font-extrabold text-[var(--color-primary)]">
                      {leader.position}
                    </span>
                    <strong className="text-[0.98rem] text-[var(--color-primary)]">
                      {leader.playerName}
                    </strong>
                    <div className="flex min-w-0 items-center gap-3">
                      <TeamLogo
                        team={{
                          id: leader.teamId ?? leader.playerId,
                          name: leader.teamName,
                          logoUrl: leader.teamLogoUrl,
                        }}
                        size="table"
                      />
                      <span className="truncate text-sm text-[var(--color-text-muted)]">
                        {leader.teamName}
                      </span>
                    </div>
                    <span className="text-center text-sm font-semibold text-[var(--color-primary)]">
                      {leader.gamesPlayed}
                    </span>
                    <span className="text-center text-sm font-semibold text-[var(--color-primary)]">
                      {leader.total}
                    </span>
                    <span className="text-center text-sm font-extrabold text-[var(--color-primary)]">
                      {leader.average.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}
