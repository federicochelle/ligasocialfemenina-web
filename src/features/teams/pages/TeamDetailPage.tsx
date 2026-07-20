import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageIntro } from '../../../components/placeholders/PageIntro'
import { HomeSectionEmptyState } from '../../home/components/HomeSectionEmptyState'
import { TeamLogo } from '../../home/components/TeamLogo'
import { getPublicTeamDetail } from '../services/team-detail.service'
import type { PublicTeamDetail, PublicTeamPlayerSeasonRow } from '../types/team-detail.types'

function TeamSeasonTable({ rows }: { rows: PublicTeamPlayerSeasonRow[] }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-[0_10px_28px_rgba(9,18,44,0.06)]">
      <header className="bg-[var(--color-primary)] px-4 py-3 min-[901px]:px-5">
        <h2 className="text-[0.86rem] font-extrabold tracking-[0.16em] text-white uppercase">
          Estadisticas de la temporada
        </h2>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-line)] bg-[rgba(11,27,69,0.03)] text-[0.68rem] font-extrabold tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
              <th className="px-4 py-3 text-left min-[901px]:px-5">Jugadora</th>
              <th className="px-2 py-3 text-center">PJ</th>
              <th className="px-2 py-3 text-center">PTS</th>
              <th className="px-2 py-3 text-center">REB</th>
              <th className="px-2 py-3 text-center">AST</th>
              <th className="px-2 py-3 text-center">3PT</th>
              <th className="px-4 py-3 text-center min-[901px]:px-5">TAP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.playerId} className="border-b border-[rgba(11,27,69,0.06)] last:border-b-0">
                <td className="px-4 py-3 text-[0.92rem] font-semibold text-[var(--color-primary)] min-[901px]:px-5">
                  {row.playerName}
                </td>
                <td className="px-2 py-3 text-center text-sm font-extrabold text-[var(--color-primary)]">
                  {row.gamesPlayed}
                </td>
                <td className="px-2 py-3 text-center text-sm font-extrabold text-[var(--color-primary)]">
                  {row.points.toFixed(1)}
                </td>
                <td className="px-2 py-3 text-center text-sm font-extrabold text-[var(--color-primary)]">
                  {row.rebounds.toFixed(1)}
                </td>
                <td className="px-2 py-3 text-center text-sm font-extrabold text-[var(--color-primary)]">
                  {row.assists.toFixed(1)}
                </td>
                <td className="px-2 py-3 text-center text-sm font-extrabold text-[var(--color-primary)]">
                  {row.triples.toFixed(1)}
                </td>
                <td className="px-4 py-3 text-center text-sm font-extrabold text-[var(--color-primary)] min-[901px]:px-5">
                  {row.blocks.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export function TeamDetailPage() {
  const { teamId = '' } = useParams()
  const [detail, setDetail] = useState<PublicTeamDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    let isMounted = true

    setIsLoading(true)
    setErrorMessage(null)
    setIsNotFound(false)

    void getPublicTeamDetail(teamId)
      .then((data) => {
        if (!isMounted) {
          return
        }

        if (!data) {
          setDetail(null)
          setIsNotFound(true)
          return
        }

        setDetail(data)
      })
      .catch((error: unknown) => {
        console.error(error)

        if (isMounted) {
          setDetail(null)
          setErrorMessage(
            error instanceof Error ? error.message : 'No pudimos cargar el detalle del equipo.',
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
  }, [teamId])

  const hasSeasonStats = (detail?.players.some((player) => player.gamesPlayed > 0) ?? false)
  return (
    <section className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
      <div className="-mx-5 bg-white px-5 py-6 min-[901px]:mx-0 min-[901px]:rounded-[1.8rem] min-[901px]:border min-[901px]:border-[var(--color-line)] min-[901px]:px-8 min-[901px]:py-8 min-[901px]:shadow-[0_18px_50px_rgba(5,12,31,0.12)]">
        <PageIntro
          eyebrow="Equipo"
          title="Perfil del equipo."
          description=""
        />

        {isLoading ? (
          <div className="mt-6 space-y-6">
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-[rgba(11,27,69,0.03)] p-6">
              <div className="h-8 w-48 rounded-full bg-[rgba(11,27,69,0.08)]" />
              <div className="mt-4 h-5 w-64 rounded-full bg-[rgba(11,27,69,0.08)]" />
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-[0_10px_28px_rgba(9,18,44,0.06)]">
              <div className="h-[3.1rem] bg-[var(--color-primary)]/95" />
              <div className="space-y-3 px-4 py-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`team-stats-placeholder-${index}`}
                    className="h-4 w-full rounded-full bg-[rgba(11,27,69,0.08)]"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : errorMessage ? (
          <div className="mt-6 grid min-h-52 place-items-center px-5 py-8 text-center">
            <p className="max-w-xl text-sm font-semibold text-[var(--color-accent)]">{errorMessage}</p>
          </div>
        ) : isNotFound || !detail ? (
          <div className="mt-6 grid min-h-52 place-items-center px-5 py-8">
            <HomeSectionEmptyState message="El equipo que buscas no existe o no esta disponible." />
          </div>
        ) : (
          <div className="mt-6 grid gap-6">
            <article className="-mx-5 overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-[0_10px_28px_rgba(9,18,44,0.06)] min-[901px]:mx-0">
              <div className="grid gap-6 px-5 py-6 min-[901px]:px-8 min-[901px]:py-8">
                <div className="grid justify-items-center gap-4 text-center">
                  <TeamLogo team={detail.team} size="detail" linkToTeam={false} />
                  <strong className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                    {detail.team.name}
                  </strong>
                </div>

                <div className="grid gap-2 border-t border-[var(--color-line)] pt-4 text-center min-[901px]:grid-cols-4 min-[901px]:gap-4">
                  {detail.seasonStats.seasonLabel ? (
                    <div>
                      <span className="block text-[0.68rem] font-extrabold tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
                        Temporada
                      </span>
                      <strong className="text-[0.95rem] text-[var(--color-primary)]">
                        {detail.seasonStats.seasonLabel}
                      </strong>
                    </div>
                  ) : null}
                  {detail.seasonStats.gamesPlayed !== null ? (
                    <div>
                      <span className="block text-[0.68rem] font-extrabold tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
                        PJ
                      </span>
                      <strong className="text-[0.95rem] text-[var(--color-primary)]">
                        {detail.seasonStats.gamesPlayed}
                      </strong>
                    </div>
                  ) : null}
                  {detail.seasonStats.wins !== null ? (
                    <div>
                      <span className="block text-[0.68rem] font-extrabold tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
                        Victorias
                      </span>
                      <strong className="text-[0.95rem] text-[var(--color-primary)]">
                        {detail.seasonStats.wins}
                      </strong>
                    </div>
                  ) : null}
                  {detail.seasonStats.losses !== null ? (
                    <div>
                      <span className="block text-[0.68rem] font-extrabold tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
                        Derrotas
                      </span>
                      <strong className="text-[0.95rem] text-[var(--color-primary)]">
                        {detail.seasonStats.losses}
                      </strong>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>

            {!hasSeasonStats ? (
              <div className="-mx-5 grid min-h-52 place-items-center rounded-[1.5rem] border border-[var(--color-line)] bg-white px-5 py-8 shadow-[0_10px_28px_rgba(9,18,44,0.06)] min-[901px]:mx-0">
                <HomeSectionEmptyState message="Este equipo todavia no tiene estadisticas publicadas." />
              </div>
            ) : (
              <div className="-mx-5 min-[901px]:mx-0">
                <TeamSeasonTable rows={detail.players} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
