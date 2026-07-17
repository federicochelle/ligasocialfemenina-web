import { TeamLogo } from '../../home/components/TeamLogo'
import type { PublicMatchRound } from '../mocks/matchesPage.mock'

type FixtureRoundCardProps = {
  round: PublicMatchRound
}

const dateFormatter = new Intl.DateTimeFormat('es-UY', {
  day: '2-digit',
  month: 'short',
})

const timeFormatter = new Intl.DateTimeFormat('es-UY', {
  hour: '2-digit',
  minute: '2-digit',
})

export function FixtureRoundCard({ round }: FixtureRoundCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-[0_10px_28px_rgba(9,18,44,0.06)]">
      <header className="bg-[var(--color-primary)] px-5 py-3">
        <h2 className="text-[0.86rem] font-extrabold tracking-[0.16em] text-white uppercase">
          {round.label}
        </h2>
      </header>

      <div className="divide-y divide-[rgba(11,27,69,0.08)]">
        {round.matches.map((match) => {
          const isFinished = match.status === 'finished'

          return (
            <div
              key={match.id}
              className="grid gap-4 px-4 py-4 min-[901px]:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)] min-[901px]:items-center"
            >
              <div className="grid grid-cols-[2.6rem_minmax(0,1fr)_auto] items-center gap-3">
                <TeamLogo team={match.homeTeam} size="table" />
                <span className="truncate text-[0.95rem] font-semibold text-[var(--color-primary)]">
                  {match.homeTeam.name}
                </span>
                {isFinished ? (
                  <strong className="text-[1rem] font-extrabold text-[var(--color-primary)]">
                    {match.homeScore ?? 0}
                  </strong>
                ) : null}
              </div>

              <div className="grid gap-1 text-center">
                {isFinished ? (
                  <span className="text-[0.72rem] font-extrabold tracking-[0.14em] text-[var(--color-accent)] uppercase">
                    Finalizado
                  </span>
                ) : (
                  <span className="text-[0.82rem] font-black tracking-[0.18em] text-[var(--color-primary)] uppercase">
                    VS
                  </span>
                )}
                <span className="text-[0.82rem] font-semibold text-[var(--color-primary)]">
                  {dateFormatter.format(new Date(match.matchDate))}
                  {' · '}
                  {timeFormatter.format(new Date(match.matchDate))}
                </span>
                <span className="truncate text-[0.78rem] text-[var(--color-text-muted)]">
                  {match.venue}
                </span>
              </div>

              <div className="grid grid-cols-[auto_minmax(0,1fr)_2.6rem] items-center justify-end gap-3">
                {isFinished ? (
                  <strong className="text-[1rem] font-extrabold text-[var(--color-primary)]">
                    {match.awayScore ?? 0}
                  </strong>
                ) : null}
                <span className="justify-self-end truncate text-right text-[0.95rem] font-semibold text-[var(--color-primary)]">
                  {match.awayTeam.name}
                </span>
                <div className="justify-self-end">
                  <TeamLogo team={match.awayTeam} size="table" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}
