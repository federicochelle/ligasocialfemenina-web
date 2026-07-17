import { HomeSectionEmptyState } from './HomeSectionEmptyState'
import { TeamLogo } from './TeamLogo'
import type { PublicStandingRow } from '../../statistics/types/statistics.types'

type StandingsPreviewSectionProps = {
  standings: PublicStandingRow[]
}

export function StandingsPreviewSection({
  standings,
}: StandingsPreviewSectionProps) {
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-soft min-[901px]:min-h-[25.75rem]">
      <header className="bg-[var(--color-primary)] px-4 py-3 min-[901px]:px-5">
        <h2 className="text-[0.88rem] font-extrabold tracking-[0.16em] text-white uppercase">
          Tabla de posiciones
        </h2>
      </header>

      {standings.length === 0 ? (
        <div className="grid min-h-52 place-items-center px-4 py-8">
          <HomeSectionEmptyState message="Sin posiciones disponibles." />
        </div>
      ) : (
        <div>
          <div>
            <div className="grid grid-cols-[1.2rem_1.85rem_minmax(0,1fr)_1.85rem_1.85rem_1.85rem_2.1rem] items-center gap-x-1.5 border-b border-[var(--color-line)] bg-[rgba(11,27,69,0.04)] px-3 py-3 text-[0.58rem] font-extrabold tracking-[0.08em] text-[var(--color-text-muted)] uppercase min-[901px]:grid-cols-[1.9rem_2.6rem_minmax(8rem,1fr)_2.6rem_2.6rem_2.6rem_2.9rem] min-[901px]:gap-[0.45rem] min-[901px]:px-5 min-[901px]:text-[0.72rem] min-[901px]:tracking-[0.14em]">
              <span>#</span>
              <span />
              <span>Equipo</span>
              <span className="text-center">PJ</span>
              <span className="text-center">PG</span>
              <span className="text-center">PP</span>
              <span className="text-center">PTS</span>
            </div>

            {standings.map((team) => (
              <div
                key={team.teamId}
                className="grid grid-cols-[1.2rem_1.85rem_minmax(0,1fr)_1.85rem_1.85rem_1.85rem_2.1rem] items-center gap-x-1.5 border-b border-[rgba(11,27,69,0.06)] px-3 py-2.5 transition-colors duration-200 hover:bg-[rgba(11,27,69,0.04)] min-[901px]:grid-cols-[1.9rem_2.6rem_minmax(8rem,1fr)_2.6rem_2.6rem_2.6rem_2.9rem] min-[901px]:gap-[0.45rem] min-[901px]:px-5"
              >
                <span className="text-xs font-bold text-[var(--color-text)] min-[901px]:text-sm">
                  {team.rank}
                </span>
                <div className="scale-[0.88] justify-self-center min-[901px]:scale-100">
                  <TeamLogo
                    team={{
                      id: team.teamId,
                      name: team.teamName,
                      logoUrl: team.teamLogoUrl,
                    }}
                    size="table"
                  />
                </div>
                <strong className="min-w-0 truncate pl-1 text-[0.77rem] leading-[1.12] text-[var(--color-primary)] min-[901px]:pl-2 min-[901px]:text-[0.95rem]">
                  {team.teamName}
                </strong>
                <span className="text-center text-[0.72rem] text-[var(--color-text)] min-[901px]:text-sm">
                  {team.gamesPlayed}
                </span>
                <span className="text-center text-[0.72rem] text-[var(--color-text)] min-[901px]:text-sm">
                  {team.wins}
                </span>
                <span className="text-center text-[0.72rem] text-[var(--color-text)] min-[901px]:text-sm">
                  {team.losses}
                </span>
                <span className="text-center text-[0.72rem] font-bold text-[var(--color-primary)] min-[901px]:text-sm">
                  {team.standingsPoints}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
