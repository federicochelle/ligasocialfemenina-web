import { HomeSectionEmptyState } from './HomeSectionEmptyState'
import { TeamLogo } from './TeamLogo'
import type { HomeTeamSummary } from '../types/home.types'

type TeamsSectionProps = {
  teams: HomeTeamSummary[]
}

export function TeamsSection({ teams }: TeamsSectionProps) {
  if (teams.length === 0) {
    return (
      <section className="col-span-12 bg-white px-4 py-5">
        <HomeSectionEmptyState message="Aun no hay equipos disponibles." />
      </section>
    )
  }

  return (
    <section className="col-span-12 bg-white px-2 py-5 min-[901px]:px-4 min-[901px]:py-6">
      <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid min-w-max grid-flow-col auto-cols-[minmax(7.25rem,1fr)] gap-1 min-[901px]:min-w-0 min-[901px]:auto-cols-fr">
          {teams.map((team) => (
            <div
              key={team.id}
              className="grid justify-items-center px-3 py-2 text-center transition-transform duration-200 hover:scale-[1.03] focus-visible:scale-[1.03] min-[901px]:py-3"
            >
              <TeamLogo team={team} size="band" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
