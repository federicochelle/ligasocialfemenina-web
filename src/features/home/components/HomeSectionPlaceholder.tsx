type HomeSectionPlaceholderProps = {
  title: string
}

export function HomeSectionPlaceholder({
  title,
}: HomeSectionPlaceholderProps) {
  return (
    <article
      aria-label={`Cargando ${title}`}
      className="relative grid min-h-[16rem] gap-6 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,247,251,0.98)),var(--color-surface)] p-7 shadow-card max-[640px]:min-h-[auto] max-[640px]:rounded-[1.5rem] max-[640px]:p-[1.35rem]"
    >
      <div className="relative z-10 grid gap-4" aria-hidden="true">
        <span className="h-6 w-28 rounded-full bg-[linear-gradient(90deg,rgba(11,27,69,0.08),rgba(246,68,160,0.18),rgba(11,27,69,0.08))]" />
        <span className="h-8 w-[58%] rounded-full bg-[linear-gradient(90deg,rgba(11,27,69,0.08),rgba(246,68,160,0.18),rgba(11,27,69,0.08))]" />
        <span className="h-4 w-[82%] rounded-full bg-[linear-gradient(90deg,rgba(11,27,69,0.08),rgba(246,68,160,0.18),rgba(11,27,69,0.08))]" />
      </div>

      <div className="relative z-10 mt-auto grid gap-3" aria-hidden="true">
        <span className="h-[0.8rem] w-[92%] rounded-full bg-[linear-gradient(90deg,rgba(11,27,69,0.08),rgba(246,68,160,0.18),rgba(11,27,69,0.08))]" />
        <span className="h-[0.8rem] w-[76%] rounded-full bg-[linear-gradient(90deg,rgba(11,27,69,0.08),rgba(246,68,160,0.18),rgba(11,27,69,0.08))]" />
        <span className="h-[0.8rem] w-[58%] rounded-full bg-[linear-gradient(90deg,rgba(11,27,69,0.08),rgba(246,68,160,0.18),rgba(11,27,69,0.08))]" />
        <span className="h-[0.8rem] w-[84%] rounded-full bg-[linear-gradient(90deg,rgba(11,27,69,0.08),rgba(246,68,160,0.18),rgba(11,27,69,0.08))]" />
      </div>
    </article>
  )
}
