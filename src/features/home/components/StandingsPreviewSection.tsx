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
        <div className="overflow-x-auto">
          <div className="min-w-[31rem]">
            <div className="grid grid-cols-[1.9rem_2.6rem_minmax(8rem,1fr)_2.6rem_2.6rem_2.6rem_2.9rem] items-center gap-[0.45rem] border-b border-[var(--color-line)] bg-[rgba(11,27,69,0.04)] px-4 py-3 text-[0.72rem] font-extrabold tracking-[0.14em] text-[var(--color-text-muted)] uppercase min-[901px]:px-5">
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
                className="grid grid-cols-[1.9rem_2.6rem_minmax(8rem,1fr)_2.6rem_2.6rem_2.6rem_2.9rem] items-center gap-[0.45rem] border-b border-[rgba(11,27,69,0.06)] px-4 py-2.5 transition-colors duration-200 hover:bg-[rgba(11,27,69,0.04)] min-[901px]:px-5"
              >
                <span className="text-sm font-bold text-[var(--color-text)]">{team.rank}</span>
                <TeamLogo
                  team={{
                    id: team.teamId,
                    name: team.teamName,
                    logoUrl: team.teamLogoUrl,
                  }}
                  size="table"
                />
                <strong className="truncate text-[0.95rem] text-[var(--color-primary)]">
                  {team.teamName}
                </strong>
                <span className="text-center text-sm text-[var(--color-text)]">
                  {team.gamesPlayed}
                </span>
                <span className="text-center text-sm text-[var(--color-text)]">{team.wins}</span>
                <span className="text-center text-sm text-[var(--color-text)]">
                  {team.losses}
                </span>
                <span className="text-center text-sm font-bold text-[var(--color-primary)]">
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
