import { Link } from 'react-router-dom'
import type { HomeTeamSummary } from '../types/home.types'

type TeamLogoProps = {
  team: HomeTeamSummary
  size?: 'ticker' | 'table' | 'card' | 'band' | 'detail'
  linkToTeam?: boolean
}

const variantClasses = {
  ticker: {
    frame: 'h-9 w-9',
    inset: 'p-0.5',
    fallback: 'text-[0.7rem]',
  },
  table: {
    frame: 'h-10 w-10',
    inset: 'p-0.5',
    fallback: 'text-[0.76rem]',
  },
  card: {
    frame: 'h-14 w-14',
    inset: 'p-1',
    fallback: 'text-[0.95rem]',
  },
  band: {
    frame: 'h-[4.4rem] w-[4.4rem] min-[901px]:h-[5.6rem] min-[901px]:w-[5.6rem]',
    inset: 'p-0',
    fallback: 'text-[1.2rem]',
  },
  detail: {
    frame: 'h-28 w-28',
    inset: 'p-1.5',
    fallback: 'text-[1.45rem]',
  },
} satisfies Record<
  NonNullable<TeamLogoProps['size']>,
  {
    frame: string
    inset: string
    fallback: string
  }
>

export function TeamLogo({ team, size = 'card', linkToTeam = true }: TeamLogoProps) {
  const initials = team.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? '')
    .join('')
  const variant = variantClasses[size] ?? variantClasses.card
  const content = (
    <div
      className={[
        'aspect-square shrink-0 overflow-visible bg-transparent flex items-center justify-center',
        variant.frame,
      ].join(' ')}
    >
      {team.logoUrl ? (
        <div className={['h-full w-full', variant.inset].join(' ')}>
          <img
            src={team.logoUrl}
            alt=""
            loading="lazy"
            className="block h-full w-full object-contain object-center"
          />
        </div>
      ) : (
        <div
          className={[
            'flex h-full w-full items-center justify-center rounded-[1rem] bg-[rgba(11,27,69,0.08)] text-[var(--color-primary)]',
            variant.inset,
          ].join(' ')}
        >
          <span className={['font-extrabold tracking-[0.08em]', variant.fallback].join(' ')}>
            {initials}
          </span>
        </div>
      )}
    </div>
  )

  if (!linkToTeam || !team.id) {
    return content
  }

  return (
    <Link to={`/equipos/${team.id}`} aria-label={`Ver equipo ${team.name}`}>
      {content}
    </Link>
  )
}
