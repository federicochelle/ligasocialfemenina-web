import { TeamLogo } from './TeamLogo'
import type { HomeMatchPreview } from '../types/home.types'

type MatchRailCardProps = {
  item: HomeMatchPreview
}

const dateFormatter = new Intl.DateTimeFormat('es-UY', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

export function MatchRailCard({ item }: MatchRailCardProps) {
  const isScheduled = item.status === 'scheduled'

  return (
    <article className="grid min-h-full gap-4 rounded-[1.35rem] border border-[rgba(11,27,69,0.08)] bg-[rgba(255,255,255,0.78)] p-[1.1rem]">
      <span
        className={[
          'w-fit rounded-full px-[0.65rem] py-[0.4rem] text-[0.72rem] font-extrabold tracking-[0.12em] uppercase',
          isScheduled
            ? 'bg-[rgba(246,68,160,0.12)] text-[var(--color-accent)]'
            : 'bg-[rgba(11,27,69,0.08)] text-[var(--color-primary)]',
        ].join(' ')}
      >
        {isScheduled ? 'Proximo' : 'Finalizado'}
      </span>

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        <div className="grid justify-items-center gap-[0.65rem] text-center">
          <TeamLogo team={item.homeTeam} size="card" />
          <strong className="leading-[1.2] text-[var(--color-primary)]">{item.homeTeam.name}</strong>
        </div>

        <div className="grid place-items-center">
          {isScheduled ? (
            <span className="font-black text-[var(--color-primary)]">VS</span>
          ) : (
            <span className="text-[1.05rem] font-black text-[var(--color-primary)]">
              {item.homeScore ?? 0} - {item.awayScore ?? 0}
            </span>
          )}
        </div>

        <div className="grid justify-items-center gap-[0.65rem] text-center">
          <TeamLogo team={item.awayTeam} size="card" />
          <strong className="leading-[1.2] text-[var(--color-primary)]">{item.awayTeam.name}</strong>
        </div>
      </div>

      <div className="grid gap-1 text-[0.9rem] text-[var(--color-text-muted)]">
        <span>{dateFormatter.format(new Date(item.matchDate))}</span>
        {item.venue ? <span>{item.venue}</span> : null}
      </div>
    </article>
  )
}
