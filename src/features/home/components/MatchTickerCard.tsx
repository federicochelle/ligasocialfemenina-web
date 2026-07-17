import type { HomeMatchTickerItem } from '../types/home.types'

type MatchTickerCardProps = {
  match: HomeMatchTickerItem
}

const dateFormatter = new Intl.DateTimeFormat('es-UY', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('es-UY', {
  hour: '2-digit',
  minute: '2-digit',
})

export function MatchTickerCard({ match }: MatchTickerCardProps) {
  const isFinished = match.status === 'finished'

  return (
    <article className="grid h-[8.4rem] gap-[0.5rem] rounded-[0.35rem] border border-[rgba(11,27,69,0.08)] bg-[rgba(255,255,255,0.96)] px-[0.8rem] py-[0.7rem] shadow-[0_10px_20px_rgba(8,17,41,0.08)]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[0.62rem] leading-[1.1] font-extrabold tracking-[0.04em] text-[var(--color-text-muted)]">
          {match.seasonLabel ?? 'Liga Social Femenina'}
        </span>
        <span className="text-[0.62rem] font-black tracking-[0.08em] uppercase text-[var(--color-accent)]">
          {match.roundNumber !== null ? `Fecha ${match.roundNumber}` : 'Fecha'}
        </span>
      </div>

      <div className="grid gap-[0.35rem]">
        <div className="grid gap-[0.12rem]">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <strong className="block truncate text-[0.95rem] font-black leading-[1.15] text-[var(--color-primary)]">
                {match.homeTeam.name.toUpperCase()}
              </strong>
            </div>
            {isFinished ? (
              <span className="shrink-0 text-[1.08rem] font-black tracking-[0.04em] text-[var(--color-primary)]">
                {match.homeScore ?? 0}
              </span>
            ) : null}
          </div>
        </div>

        <div className="grid gap-[0.12rem]">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <strong className="block truncate text-[0.95rem] font-black leading-[1.15] text-[var(--color-primary)]">
                {match.awayTeam.name.toUpperCase()}
              </strong>
            </div>
            {isFinished ? (
              <span className="shrink-0 text-[1.08rem] font-black tracking-[0.04em] text-[var(--color-primary)]">
                {match.awayScore ?? 0}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 text-[0.66rem] font-extrabold tracking-[0.06em] text-[var(--color-text-muted)] uppercase">
        <span>{dateFormatter.format(new Date(match.matchDate))}</span>
        <span>{timeFormatter.format(new Date(match.matchDate))}</span>
      </div>
    </article>
  )
}
