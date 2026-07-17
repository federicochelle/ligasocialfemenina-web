import { useEffect, useState } from 'react'
import { PageIntro } from '../../../components/placeholders/PageIntro'
import { HomeSectionEmptyState } from '../../home/components/HomeSectionEmptyState'
import { FixtureRoundCard } from '../components/FixtureRoundCard'
import { getPublicMatchRounds } from '../services/matches.service'
import type { PublicMatchRound } from '../types/matches.types'

export function MatchesPage() {
  const [rounds, setRounds] = useState<PublicMatchRound[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    setIsLoading(true)
    setErrorMessage(null)

    void getPublicMatchRounds()
      .then((data) => {
        if (isMounted) {
          setRounds(data)
        }
      })
      .catch((error: unknown) => {
        console.error(error)

        if (isMounted) {
          setRounds([])
          setErrorMessage(
            error instanceof Error ? error.message : 'No pudimos cargar los partidos publicos.',
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
  }, [])

  return (
    <section className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
      <div className="rounded-[1.8rem] border border-[var(--color-line)] bg-white px-5 py-6 shadow-[0_18px_50px_rgba(5,12,31,0.12)] min-[901px]:px-8 min-[901px]:py-8">
        <PageIntro
          eyebrow="Partidos"
          title="Fixture y resultados de la Liga Social Femenina."
          description=""
        />

        {isLoading ? (
          <div className="mt-6 grid gap-6 min-[901px]:grid-cols-2" aria-label="Cargando jornadas">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`round-placeholder-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-[0_10px_28px_rgba(9,18,44,0.06)]"
              >
                <div className="h-[3.1rem] bg-[var(--color-primary)]/95" />
                <div className="space-y-3 px-4 py-4">
                  <div className="h-4 w-28 rounded-full bg-[rgba(11,27,69,0.08)]" />
                  <div className="h-4 w-36 rounded-full bg-[rgba(11,27,69,0.08)]" />
                </div>
                <div className="divide-y divide-[rgba(11,27,69,0.08)]">
                  {Array.from({ length: 3 }).map((__, matchIndex) => (
                    <div key={`match-placeholder-${index}-${matchIndex}`} className="space-y-3 px-4 py-4">
                      <div className="h-4 w-full rounded-full bg-[rgba(11,27,69,0.08)]" />
                      <div className="h-4 w-2/3 rounded-full bg-[rgba(11,27,69,0.08)]" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : errorMessage ? (
          <div className="mt-6 grid min-h-52 place-items-center px-5 py-8 text-center">
            <p className="max-w-xl text-sm font-semibold text-[var(--color-accent)]">{errorMessage}</p>
          </div>
        ) : rounds.length === 0 ? (
          <div className="mt-6 grid min-h-52 place-items-center px-5 py-8">
            <HomeSectionEmptyState message="Todavia no hay jornadas ni partidos publicados." />
          </div>
        ) : (
          <div className="mt-6 -mx-5 grid gap-6 min-[901px]:mx-0 min-[901px]:grid-cols-2">
            {rounds.map((round) => (
              <FixtureRoundCard key={round.id} round={round} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
