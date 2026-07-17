import type { HomeTeamSummary } from '../types/home.types'

type TeamLogoProps = {
  team: HomeTeamSummary
  size?: 'ticker' | 'table' | 'card' | 'band' | 'detail'
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
    frame: 'h-[5.6rem] w-[5.6rem]',
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

export function TeamLogo({ team, size = 'card' }: TeamLogoProps) {
  const initials = team.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? '')
    .join('')
  const variant = variantClasses[size] ?? variantClasses.card

  return (
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
}
