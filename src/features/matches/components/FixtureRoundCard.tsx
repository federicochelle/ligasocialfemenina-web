import { TeamLogo } from '../../home/components/TeamLogo'
import type { PublicMatchRound } from '../types/matches.types'

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
          const courtLabel = match.field ?? match.venue ?? 'Cancha por confirmar'

          return (
            <div
              key={match.id}
              className="grid grid-cols-[2.6rem_2.2rem_minmax(0,1fr)_2.2rem_2.6rem] items-center gap-2 px-4 py-4 min-[901px]:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)] min-[901px]:gap-4"
            >
              <div className="min-[901px]:grid min-[901px]:grid-cols-[2.6rem_minmax(0,1fr)_auto] min-[901px]:items-center min-[901px]:gap-3">
                <TeamLogo team={match.homeTeam} size="table" />
                <span className="hidden truncate text-[0.95rem] font-semibold text-[var(--color-primary)] min-[901px]:block">
                  {match.homeTeam.name}
                </span>
                {isFinished ? (
                  <strong className="hidden text-[1rem] font-extrabold text-[var(--color-primary)] min-[901px]:block">
                    {match.homeScore ?? 0}
                  </strong>
                ) : null}
              </div>

              <div className="grid min-h-[1.5rem] place-items-center min-[901px]:hidden">
                {isFinished ? (
                  <strong className="text-[1rem] font-extrabold text-[var(--color-primary)]">
                    {match.homeScore ?? 0}
                  </strong>
                ) : null}
              </div>

              <div className="grid gap-1 text-center">
                {isFinished ? (
                  <span className="text-[0.72rem] font-extrabold tracking-[0.14em] text-[var(--color-accent)] uppercase min-[901px]:text-[0.72rem]">
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
                  {courtLabel}
                </span>
              </div>

              <div className="grid min-h-[1.5rem] place-items-center min-[901px]:hidden">
                {isFinished ? (
                  <strong className="text-[1rem] font-extrabold text-[var(--color-primary)]">
                    {match.awayScore ?? 0}
                  </strong>
                ) : null}
              </div>

              <div className="justify-self-end min-[901px]:grid min-[901px]:grid-cols-[auto_auto_2.6rem] min-[901px]:items-center min-[901px]:justify-end min-[901px]:gap-2">
                {isFinished ? (
                  <strong className="hidden text-[1rem] font-extrabold text-[var(--color-primary)] min-[901px]:block">
                    {match.awayScore ?? 0}
                  </strong>
                ) : null}
                <span className="hidden max-w-[10rem] truncate text-right text-[0.95rem] font-semibold text-[var(--color-primary)] min-[901px]:block">
                  {match.awayTeam.name}
                </span>
                <div>
                  <TeamLogo team={match.awayTeam} size="table" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {round.byeTeam ? (
        <footer className="border-t border-[rgba(11,27,69,0.08)] bg-[rgba(11,27,69,0.03)] px-4 py-3">
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-[0.72rem] font-extrabold tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
              Libre:
            </span>
            <TeamLogo team={round.byeTeam} size="table" />
            <p className="text-[0.95rem] font-semibold text-[var(--color-primary)]">
              {round.byeTeam.name}
            </p>
          </div>
        </footer>
      ) : null}
    </article>
  )
}
