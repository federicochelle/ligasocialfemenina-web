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

  const remainder = teams.length % 3

  return (
    <section className="col-span-12 bg-white px-1 py-4 min-[901px]:px-4 min-[901px]:py-6">
      <div className="min-[901px]:overflow-x-auto min-[901px]:[scrollbar-width:none] min-[901px]:[-ms-overflow-style:none] min-[901px]:[&::-webkit-scrollbar]:hidden">
        <div className="grid grid-cols-3 gap-1 min-[901px]:min-w-max min-[901px]:grid-flow-col min-[901px]:grid-cols-none min-[901px]:auto-cols-[minmax(7.25rem,1fr)]">
          {teams.map((team, index) => (
            <div
              key={team.id}
              className={[
                'grid justify-items-center px-3 py-2 text-center transition-transform duration-200 hover:scale-[1.03] focus-visible:scale-[1.03] min-[901px]:py-3',
                'px-2 py-1.5 min-[901px]:px-3 min-[901px]:py-3',
                remainder === 1 && index === teams.length - 1 ? 'col-start-2 min-[901px]:col-start-auto' : '',
                remainder === 2 && index === teams.length - 2
                  ? 'col-start-1 min-[901px]:col-start-auto'
                  : '',
                remainder === 2 && index === teams.length - 1
                  ? 'col-start-3 min-[901px]:col-start-auto'
                  : '',
              ].join(' ')}
            >
              <TeamLogo team={team} size="band" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
