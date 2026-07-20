import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageIntro } from '../../../components/placeholders/PageIntro'
import { HomeSectionEmptyState } from '../../home/components/HomeSectionEmptyState'
import { TeamLogo } from '../../home/components/TeamLogo'
import { getPublicMatchDetail } from '../services/matches.service'
import type { PublicMatchDetail, PublicMatchPlayerStatRow } from '../types/matches.types'

const dateFormatter = new Intl.DateTimeFormat('es-UY', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('es-UY', {
  hour: '2-digit',
  minute: '2-digit',
})

function MatchStatsTable({
  title,
  rows,
}: {
  title: string
  rows: PublicMatchPlayerStatRow[]
}) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-[0_10px_28px_rgba(9,18,44,0.06)]">
      <header className="bg-[var(--color-primary)] px-4 py-3 min-[901px]:px-5">
        <h2 className="text-[0.86rem] font-extrabold tracking-[0.16em] text-white uppercase">
          {title}
        </h2>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-line)] bg-[rgba(11,27,69,0.03)] text-[0.68rem] font-extrabold tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
              <th className="px-4 py-3 text-left min-[901px]:px-5">Jugadora</th>
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
                  {row.points}
                </td>
                <td className="px-2 py-3 text-center text-sm font-extrabold text-[var(--color-primary)]">
                  {row.rebounds}
                </td>
                <td className="px-2 py-3 text-center text-sm font-extrabold text-[var(--color-primary)]">
                  {row.assists}
                </td>
                <td className="px-2 py-3 text-center text-sm font-extrabold text-[var(--color-primary)]">
                  {row.triples}
                </td>
                <td className="px-4 py-3 text-center text-sm font-extrabold text-[var(--color-primary)] min-[901px]:px-5">
                  {row.blocks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

function getStatusLabel(status: PublicMatchDetail['match']['status']) {
  if (status === 'finished') {
    return 'Finalizado'
  }

  if (status === 'live') {
    return 'En juego'
  }

  if (status === 'cancelled') {
    return 'Cancelado'
  }

  return 'Programado'
}

export function MatchDetailPage() {
  const { matchId = '' } = useParams()
  const [detail, setDetail] = useState<PublicMatchDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    let isMounted = true

    setIsLoading(true)
    setErrorMessage(null)
    setIsNotFound(false)

    void getPublicMatchDetail(matchId)
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
            error instanceof Error ? error.message : 'No pudimos cargar el detalle del partido.',
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
  }, [matchId])

  const hasStats = (detail?.homePlayers.length ?? 0) > 0 || (detail?.awayPlayers.length ?? 0) > 0
  const matchDate = detail ? new Date(detail.match.matchDate) : null
  const courtLabel = detail?.match.field ?? detail?.match.venue ?? 'Cancha por confirmar'

  return (
    <section className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
      <div className="rounded-[1.8rem] border border-[var(--color-line)] bg-white px-5 py-6 shadow-[0_18px_50px_rgba(5,12,31,0.12)] min-[901px]:px-8 min-[901px]:py-8">
        <PageIntro
          eyebrow="Partido"
          title="Detalle del partido."
          description=""
        />

        {isLoading ? (
          <div className="mt-6 space-y-6">
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-[rgba(11,27,69,0.03)] p-6">
              <div className="h-8 w-48 rounded-full bg-[rgba(11,27,69,0.08)]" />
              <div className="mt-4 h-5 w-64 rounded-full bg-[rgba(11,27,69,0.08)]" />
            </div>
            <div className="grid gap-6 min-[901px]:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={`stats-placeholder-${index}`}
                  className="overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-[0_10px_28px_rgba(9,18,44,0.06)]"
                >
                  <div className="h-[3.1rem] bg-[var(--color-primary)]/95" />
                  <div className="space-y-3 px-4 py-4">
                    {Array.from({ length: 5 }).map((__, rowIndex) => (
                      <div
                        key={`row-placeholder-${index}-${rowIndex}`}
                        className="h-4 w-full rounded-full bg-[rgba(11,27,69,0.08)]"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : errorMessage ? (
          <div className="mt-6 grid min-h-52 place-items-center px-5 py-8 text-center">
            <p className="max-w-xl text-sm font-semibold text-[var(--color-accent)]">{errorMessage}</p>
          </div>
        ) : isNotFound || !detail ? (
          <div className="mt-6 grid min-h-52 place-items-center px-5 py-8">
            <HomeSectionEmptyState message="El partido que buscas no existe o todavia no esta publicado." />
          </div>
        ) : (
          <div className="mt-6 grid gap-6">
            <article className="-mx-5 overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-[0_10px_28px_rgba(9,18,44,0.06)] min-[901px]:mx-0">
              <div className="grid gap-6 px-5 py-6 min-[901px]:px-8 min-[901px]:py-8">
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 min-[901px]:gap-8">
                  <div className="grid justify-items-center gap-3 text-center">
                    <TeamLogo team={detail.homeTeam} size="band" />
                    <strong className="text-[1rem] font-black text-[var(--color-primary)] min-[901px]:text-[1.25rem]">
                      {detail.homeTeam.name}
                    </strong>
                  </div>

                  <div className="grid gap-2 text-center">
                    <strong className="text-[1.7rem] font-black tracking-[-0.04em] text-[var(--color-primary)] min-[901px]:text-[2.6rem]">
                      {detail.match.homeScore ?? 0} - {detail.match.awayScore ?? 0}
                    </strong>
                    <span className="text-[0.76rem] font-extrabold tracking-[0.16em] text-[var(--color-accent)] uppercase">
                      {getStatusLabel(detail.match.status)}
                    </span>
                  </div>

                  <div className="grid justify-items-center gap-3 text-center">
                    <TeamLogo team={detail.awayTeam} size="band" />
                    <strong className="text-[1rem] font-black text-[var(--color-primary)] min-[901px]:text-[1.25rem]">
                      {detail.awayTeam.name}
                    </strong>
                  </div>
                </div>

                <div className="grid gap-1 border-t border-[var(--color-line)] pt-4 text-center">
                  <span className="text-[0.82rem] font-semibold text-[var(--color-primary)]">
                    {matchDate ? dateFormatter.format(matchDate) : 'Por confirmar'}
                    {matchDate ? ' · ' : ''}
                    {matchDate ? timeFormatter.format(matchDate) : ''}
                  </span>
                  <span className="truncate text-[0.78rem] text-[var(--color-text-muted)]">
                    {courtLabel}
                  </span>
                </div>
              </div>
            </article>

            {!hasStats ? (
              <div className="-mx-5 grid min-h-52 place-items-center rounded-[1.5rem] border border-[var(--color-line)] bg-white px-5 py-8 shadow-[0_10px_28px_rgba(9,18,44,0.06)] min-[901px]:mx-0">
                <HomeSectionEmptyState message="Partido sin estadisticas publicadas por el momento." />
              </div>
            ) : (
              <div className="-mx-5 grid gap-6 min-[901px]:mx-0 min-[901px]:grid-cols-2">
                <MatchStatsTable title={detail.homeTeam.name} rows={detail.homePlayers} />
                <MatchStatsTable title={detail.awayTeam.name} rows={detail.awayPlayers} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
