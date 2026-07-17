import { HomeSection } from './HomeSection'
import { HomeSectionEmptyState } from './HomeSectionEmptyState'
import { SectionAction } from './SectionAction'
import { TeamLogo } from './TeamLogo'
import type { HomeMatchPreview } from '../types/home.types'

type RecentResultsSectionProps = {
  results: HomeMatchPreview[]
}

export function RecentResultsSection({ results }: RecentResultsSectionProps) {
  return (
    <HomeSection
      title="Ultimos resultados"
      description="Los tres partidos finalizados mas recientes quedan listos para una lectura rapida."
      footerAction={<SectionAction to="/partidos" label="Ver resultados" />}
    >
      {results.length === 0 ? (
        <HomeSectionEmptyState message="Aun no hay resultados." />
      ) : (
        <div className="grid gap-4">
          {results.map((result) => (
            <article
              key={result.id}
              className="grid gap-4 rounded-[1.2rem] border border-[rgba(11,27,69,0.08)] bg-[rgba(255,255,255,0.72)] p-4"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 max-[900px]:grid-cols-1">
                <div className="flex min-w-0 items-center gap-3">
                  <TeamLogo team={result.homeTeam} size="table" />
                  <strong className="leading-[1.2] text-[var(--color-primary)]">
                    {result.homeTeam.name}
                  </strong>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(11,27,69,0.06)] px-[0.85rem] py-[0.65rem] font-extrabold text-[var(--color-primary)]">
                  <span>{result.homeScore ?? 0}</span>
                  <span>-</span>
                  <span>{result.awayScore ?? 0}</span>
                </div>
                <div className="flex min-w-0 items-center justify-end gap-3 text-right max-[900px]:justify-start max-[900px]:text-left">
                  <strong className="leading-[1.2] text-[var(--color-primary)]">
                    {result.awayTeam.name}
                  </strong>
                  <TeamLogo team={result.awayTeam} size="table" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </HomeSection>
  )
}
