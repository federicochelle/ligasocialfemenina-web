import { HomeSection } from './HomeSection'
import { HomeSectionEmptyState } from './HomeSectionEmptyState'
import { SectionAction } from './SectionAction'
import { MatchRailCard } from './MatchRailCard'
import type { HomeMatchPreview } from '../types/home.types'

type MatchesCarouselSectionProps = {
  nextMatch: HomeMatchPreview | null
  recentResults: HomeMatchPreview[]
}

function buildMatchRailItems(
  nextMatch: HomeMatchPreview | null,
  recentResults: HomeMatchPreview[],
) {
  return [nextMatch, ...recentResults].filter((item): item is HomeMatchPreview => item !== null)
}

export function MatchesCarouselSection({
  nextMatch,
  recentResults,
}: MatchesCarouselSectionProps) {
  const items = buildMatchRailItems(nextMatch, recentResults)

  return (
    <HomeSection
      title="Partidos destacados"
      description="Una lectura rapida entre lo que viene y lo ultimo que dejo la competencia."
      footerAction={<SectionAction to="/partidos" label="Ver fixture completo" />}
      className="col-span-12"
    >
      {items.length === 0 ? (
        <HomeSectionEmptyState message="No hay partidos programados ni resultados recientes." />
      ) : (
        <div
          className="grid auto-cols-[minmax(18rem,22rem)] grid-flow-col gap-4 overflow-x-auto pb-[0.35rem] [scroll-snap-type:x_proximity] [&::-webkit-scrollbar]:h-[0.45rem] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgba(11,27,69,0.16)] max-[640px]:auto-cols-[minmax(15rem,82vw)]"
          role="list"
          aria-label="Partidos destacados"
        >
          {items.map((item) => (
            <div
              key={`${item.status}-${item.id}`}
              className="[scroll-snap-align:start]"
              role="listitem"
            >
              <MatchRailCard item={item} />
            </div>
          ))}
        </div>
      )}
    </HomeSection>
  )
}
