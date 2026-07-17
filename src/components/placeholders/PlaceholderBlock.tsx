type PlaceholderBlockProps = {
  title: string
  description: string
  variant?: 'default' | 'hero' | 'article' | 'grid'
  lines?: number
  className?: string
}

const variantClasses = {
  default:
    'border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,247,251,0.98)),var(--color-surface)]',
  hero: [
    'min-h-[23rem] border-[rgba(255,255,255,0.08)]',
    'bg-[linear-gradient(135deg,rgba(11,27,69,0.98),rgba(19,37,84,0.94)),var(--color-primary)] text-[var(--color-text-on-dark)]',
  ].join(' '),
  article:
    'min-h-[18rem] border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,247,251,0.98)),var(--color-surface)]',
  grid:
    'min-h-[16rem] border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,247,251,0.98)),var(--color-surface)]',
} satisfies Record<NonNullable<PlaceholderBlockProps['variant']>, string>

const lineWidthClasses = ['w-[92%]', 'w-[76%]', 'w-[58%]'] as const

export function PlaceholderBlock({
  title,
  description,
  variant = 'default',
  lines = 3,
  className,
}: PlaceholderBlockProps) {
  const isHero = variant === 'hero'

  return (
    <article
      className={[
        'relative grid gap-6 overflow-hidden rounded-[var(--radius-xl)] border p-7 shadow-card',
        'max-[640px]:min-h-[auto] max-[640px]:rounded-[1.5rem] max-[640px]:p-[1.35rem]',
        'after:pointer-events-none after:absolute after:right-[-20%] after:bottom-[-42%] after:h-72 after:w-72 after:rounded-full',
        'after:bg-[radial-gradient(circle,rgba(246,68,160,0.15),transparent_72%)]',
        variantClasses[variant],
        className ?? '',
      ].join(' ')}
    >
      <div className="relative z-10 grid gap-4">
        <span
          className={[
            'inline-flex w-fit rounded-full px-3 py-[0.45rem] text-[0.76rem] font-extrabold tracking-[0.12em] uppercase',
            isHero
              ? 'bg-[rgba(246,68,160,0.18)] text-[#ffd2ea]'
              : 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]',
          ].join(' ')}
        >
          Placeholder
        </span>
        <h2
          className={[
            'text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.1] tracking-[-0.03em]',
            isHero ? 'text-inherit' : 'text-[var(--color-primary)]',
          ].join(' ')}
        >
          {title}
        </h2>
        <p className={isHero ? 'max-w-[42rem] text-inherit' : 'max-w-[42rem] text-[var(--color-text-muted)]'}>
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-auto grid gap-3" aria-hidden="true">
        {Array.from({ length: lines }).map((_, index) => (
          <span
            key={`${title}-${index}`}
            className={[
              'h-[0.8rem] rounded-full',
              lineWidthClasses[index % 3],
              isHero
                ? 'bg-[linear-gradient(90deg,rgba(255,255,255,0.12),rgba(246,68,160,0.3),rgba(255,255,255,0.12))]'
                : 'bg-[linear-gradient(90deg,rgba(11,27,69,0.08),rgba(246,68,160,0.18),rgba(11,27,69,0.08))]',
            ].join(' ')}
          />
        ))}
      </div>
    </article>
  )
}
