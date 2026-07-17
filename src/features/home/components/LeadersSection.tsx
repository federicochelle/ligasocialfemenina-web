import { useMemo, useState } from 'react'
import { HomeSectionEmptyState } from './HomeSectionEmptyState'
import { TeamLogo } from './TeamLogo'
import {
  statisticsCategoryOptions,
  type StatisticsCategoryPreview,
  type StatisticsCategory,
} from '../../statistics/types/statistics.types'

type LeadersSectionProps = {
  leaders: StatisticsCategoryPreview[]
}

export function LeadersSection({ leaders }: LeadersSectionProps) {
  const availableByCategory = useMemo(
    () => new Map(leaders.map((leader) => [leader.category, leader])),
    [leaders],
  )

  const [activeTab, setActiveTab] = useState<StatisticsCategory>(leaders[0]?.category ?? 'points')

  const activeLeader = availableByCategory.get(activeTab)

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-soft min-[901px]:min-h-[25.75rem]">
      <header className="bg-[var(--color-primary)] px-4 py-3 min-[901px]:px-5">
        <h2 className="text-[0.88rem] font-extrabold tracking-[0.16em] text-white uppercase">
          Lideres de la liga
        </h2>
      </header>

      <div className="border-b border-[var(--color-line)] px-4 py-3 min-[901px]:px-5">
        <div className="flex flex-wrap gap-2">
          {statisticsCategoryOptions.map((tab) => {
            const isActive = activeTab === tab.key
            const isAvailable = availableByCategory.has(tab.key)

            return (
              <button
                key={tab.key}
                type="button"
                className={[
                  'rounded-full border px-3 py-2 text-[0.76rem] font-extrabold tracking-[0.08em] uppercase transition-colors duration-200',
                  isActive
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                    : isAvailable
                      ? 'border-[var(--color-line)] bg-white text-[var(--color-primary)] hover:bg-[rgba(11,27,69,0.04)]'
                      : 'border-[var(--color-line)] bg-[rgba(11,27,69,0.03)] text-[var(--color-text-muted)]',
                ].join(' ')}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {leaders.length === 0 ? (
        <div className="grid min-h-52 place-items-center px-4 py-8">
          <HomeSectionEmptyState message="Sin lideres disponibles." />
        </div>
      ) : activeLeader ? (
        <div className="px-4 py-3.5 min-[901px]:px-5">
          <div className="grid">
            {activeLeader.rows.map((row) => (
              <div
                key={`${activeLeader.category}-${row.playerId}`}
                className="grid grid-cols-[2.4rem_minmax(0,1fr)_minmax(0,0.9fr)_5rem] items-center gap-3 border-b border-[rgba(11,27,69,0.06)] py-2.5 last:border-b-0"
              >
                <span className="text-sm font-extrabold text-[var(--color-primary)]">
                  {row.position}
                </span>
                <div className="flex min-w-0 items-center gap-3">
                  <TeamLogo
                    team={{
                      id: row.teamId ?? row.playerId,
                      name: row.teamName,
                      logoUrl: row.teamLogoUrl,
                    }}
                    size="ticker"
                  />
                  <div className="min-w-0">
                    <strong className="truncate text-[0.95rem] text-[var(--color-primary)]">
                      {row.playerName}
                    </strong>
                  </div>
                </div>
                <span className="truncate text-[0.82rem] text-[var(--color-text-muted)]">
                  {row.teamName}
                </span>
                <span className="text-center text-sm font-extrabold text-[var(--color-primary)]">
                  {row.average.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid min-h-52 place-items-center px-4 py-8">
          <HomeSectionEmptyState message="Sin datos para esta categoria." />
        </div>
      )}
    </section>
  )
}
