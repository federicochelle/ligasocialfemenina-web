type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <div className="max-w-[48rem] pt-5 pb-2 max-[640px]:pt-2">
      <span className="mb-[0.9rem] inline-flex items-center gap-2 text-[0.78rem] font-extrabold tracking-[0.18em] text-[var(--color-accent)] uppercase before:h-px before:w-[2.4rem] before:bg-current before:opacity-55 before:content-['']">
        {eyebrow}
      </span>
      <h1 className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] tracking-[-0.05em] text-[var(--color-primary)]">
        {title}
      </h1>
      <p className="max-w-[42rem] text-[var(--color-text-muted)]">{description}</p>
    </div>
  )
}
