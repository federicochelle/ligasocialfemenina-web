import { HomeSection } from './HomeSection'
import { HomeSectionEmptyState } from './HomeSectionEmptyState'
import { SectionAction } from './SectionAction'
import { TeamLogo } from './TeamLogo'
import type { HomeMatchPreview } from '../types/home.types'

type NextMatchSectionProps = {
  match: HomeMatchPreview | null
}

const dateFormatter = new Intl.DateTimeFormat('es-UY', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('es-UY', {
  hour: '2-digit',
  minute: '2-digit',
})

export function NextMatchSection({ match }: NextMatchSectionProps) {
  return (
    <HomeSection
      title="Proximo partido"
      description="El primer partido programado aparece en tiempo real sin depender de datos mock."
      className={[
        'border-[rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,rgba(11,27,69,0.98),rgba(19,37,84,0.94)),var(--color-primary)]',
        '[&_h2]:text-[var(--color-text-on-dark)] [&_p]:text-[var(--color-text-on-dark)] [&_strong]:text-[var(--color-text-on-dark)] [&_span]:text-[var(--color-text-on-dark)]',
      ].join(' ')}
      footerAction={<SectionAction to="/partidos" label="Ver fixture completo" />}
    >
      {!match ? (
        <HomeSectionEmptyState message="No hay partidos programados." />
      ) : (
        <div className="grid items-center gap-4 min-[901px]:grid-cols-[minmax(0,1fr)_auto_minmax(13rem,15rem)_minmax(0,1fr)]">
          <div className="grid justify-items-center gap-2 text-center max-[900px]:justify-items-start max-[900px]:text-left">
            <TeamLogo team={match.homeTeam} size="detail" />
            <span className="text-[0.76rem] font-bold tracking-[0.12em] text-[rgba(248,250,255,0.72)] uppercase">
              Local
            </span>
            <strong className="text-[clamp(1.4rem,2vw,2.1rem)] leading-[1.05]">
              {match.homeTeam.name}
            </strong>
          </div>
          <div className="justify-self-center text-[1rem] font-black tracking-[0.18em] text-[rgba(255,255,255,0.62)]">
            VS
          </div>
          <div className="grid gap-3 rounded-[1.2rem] bg-white/8 px-[1.15rem] py-[0.9rem] text-left">
            <div className="grid gap-[0.15rem]">
              <span className="text-[0.76rem] font-bold tracking-[0.12em] text-[rgba(248,250,255,0.72)] uppercase">
                Fecha
              </span>
              <p className="text-[0.98rem] font-bold">
                {dateFormatter.format(new Date(match.matchDate))}
              </p>
            </div>
            <div className="grid gap-[0.15rem]">
              <span className="text-[0.76rem] font-bold tracking-[0.12em] text-[rgba(248,250,255,0.72)] uppercase">
                Hora
              </span>
              <p className="text-[0.98rem] font-bold">
                {timeFormatter.format(new Date(match.matchDate))}
              </p>
            </div>
            <div className="grid gap-[0.15rem]">
              <span className="text-[0.76rem] font-bold tracking-[0.12em] text-[rgba(248,250,255,0.72)] uppercase">
                Cancha
              </span>
              <p className="text-[0.98rem] font-bold">{match.venue ?? 'Cancha por confirmar'}</p>
            </div>
          </div>
          <div className="grid justify-items-center gap-2 text-right max-[900px]:justify-items-start max-[900px]:text-left">
            <TeamLogo team={match.awayTeam} size="detail" />
            <span className="text-[0.76rem] font-bold tracking-[0.12em] text-[rgba(248,250,255,0.72)] uppercase">
              Visitante
            </span>
            <strong className="text-[clamp(1.4rem,2vw,2.1rem)] leading-[1.05]">
              {match.awayTeam.name}
            </strong>
          </div>
        </div>
      )}
    </HomeSection>
  )
}
