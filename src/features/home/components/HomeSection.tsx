import type { ReactNode } from 'react'

type HomeSectionProps = {
  title: string
  description: string
  children: ReactNode
  className?: string
  footerAction?: ReactNode
}

export function HomeSection({
  title,
  description,
  children,
  className,
  footerAction,
}: HomeSectionProps) {
  return (
    <article
      className={[
        'relative grid gap-6 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-line)]',
        'bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(245,247,251,0.98)),var(--color-surface)]',
        'p-7 shadow-card max-[640px]:rounded-[1.5rem] max-[640px]:p-[1.35rem]',
        'after:pointer-events-none after:absolute after:right-[-18%] after:bottom-[-38%] after:h-64 after:w-64 after:rounded-full',
        'after:bg-[radial-gradient(circle,rgba(246,68,160,0.12),transparent_72%)]',
        className ?? '',
      ].join(' ')}
    >
      <div className="relative z-10 grid gap-4">
        <span className="inline-flex w-fit rounded-full bg-[var(--color-accent-soft)] px-3 py-[0.45rem] text-[0.76rem] font-extrabold tracking-[0.12em] text-[var(--color-accent)] uppercase">
          En vivo desde la base
        </span>
        <h2 className="text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.1] tracking-[-0.03em] text-[var(--color-primary)]">
          {title}
        </h2>
        <p className="text-[var(--color-text-muted)]">{description}</p>
      </div>
      {children}
      {footerAction ? <div className="relative z-10 mt-auto">{footerAction}</div> : null}
    </article>
  )
}
