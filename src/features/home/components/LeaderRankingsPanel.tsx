import { Link } from 'react-router-dom'
import { HomeSectionEmptyState } from './HomeSectionEmptyState'
import { TeamLogo } from './TeamLogo'
import type {
  PlayerRankingRow,
  StatisticsCategory,
} from '../../statistics/types/statistics.types'
import { statisticsCategoryOptions } from '../../statistics/types/statistics.types'

type LeaderRankingsPanelProps = {
  title: string
  activeCategory: StatisticsCategory
  availableCategories: StatisticsCategory[]
  rows: PlayerRankingRow[]
  onCategoryChange: (category: StatisticsCategory) => void
  loading?: boolean
  errorMessage?: string | null
  emptyMessage: string
  footerLinkTo?: string
  footerLinkLabel?: string
  showTeamNameOnDesktop?: boolean
  className?: string
}

export function LeaderRankingsPanel({
  title,
  activeCategory,
  availableCategories,
  rows,
  onCategoryChange,
  loading = false,
  errorMessage = null,
  emptyMessage,
  footerLinkTo,
  footerLinkLabel,
  showTeamNameOnDesktop = true,
  className,
}: LeaderRankingsPanelProps) {
  return (
    <section
      className={[
        'overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-soft min-[901px]:min-h-[25.75rem]',
        className ?? '',
      ].join(' ')}
    >
      <header className="bg-[var(--color-primary)] px-4 py-3 min-[901px]:px-5">
        <h2 className="text-[0.88rem] font-extrabold tracking-[0.16em] text-white uppercase">
          {title}
        </h2>
      </header>

      <div className="border-b border-[var(--color-line)] px-4 py-3 min-[901px]:px-5">
        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-[901px]:overflow-visible">
          <div className="flex w-max flex-nowrap gap-2 min-[901px]:w-auto min-[901px]:flex-wrap">
            {statisticsCategoryOptions.map((tab) => {
              const isActive = activeCategory === tab.key
              const isAvailable = availableCategories.includes(tab.key)

              return (
                <button
                  key={tab.key}
                  type="button"
                  className={[
                    'shrink-0 rounded-full border px-3 py-2 text-[0.76rem] font-extrabold tracking-[0.08em] uppercase transition-colors duration-200',
                    isActive
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                      : isAvailable
                        ? 'border-[var(--color-line)] bg-white text-[var(--color-primary)] hover:bg-[rgba(11,27,69,0.04)]'
                        : 'border-[var(--color-line)] bg-[rgba(11,27,69,0.03)] text-[var(--color-text-muted)]',
                  ].join(' ')}
                  onClick={() => onCategoryChange(tab.key)}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid min-h-52 place-items-center px-4 py-8 text-sm font-semibold text-[var(--color-text-muted)]">
          Cargando estadisticas...
        </div>
      ) : errorMessage ? (
        <div className="grid min-h-52 place-items-center px-4 py-8 text-center">
          <p className="max-w-xl text-sm font-semibold text-[var(--color-accent)]">
            {errorMessage}
          </p>
        </div>
      ) : rows.length === 0 ? (
        <div className="grid min-h-52 place-items-center px-4 py-8">
          <HomeSectionEmptyState message={emptyMessage} />
        </div>
      ) : (
        <div className="px-4 py-3.5 min-[901px]:px-5">
          <div
            className={[
              'grid items-center gap-2 border-b border-[var(--color-line)] pb-2 text-[0.68rem] font-extrabold tracking-[0.12em] text-[var(--color-text-muted)] uppercase',
              showTeamNameOnDesktop
                ? 'grid-cols-[2rem_minmax(0,1fr)_3.4rem] min-[901px]:grid-cols-[2.4rem_minmax(0,1fr)_minmax(0,0.9fr)_5rem] min-[901px]:gap-3'
                : 'grid-cols-[2rem_minmax(0,1fr)_3.4rem] min-[901px]:grid-cols-[2.4rem_minmax(0,1fr)_5rem] min-[901px]:gap-3',
            ].join(' ')}
          >
            <span>#</span>
            <span>Jugadora</span>
            {showTeamNameOnDesktop ? (
              <>
                <span className="justify-self-end text-right min-[901px]:hidden">Promedio</span>
                <span className="hidden min-[901px]:block" />
                <span className="hidden justify-self-end text-right min-[901px]:block">
                  Promedio
                </span>
              </>
            ) : (
              <span className="justify-self-end text-right">Promedio</span>
            )}
          </div>

          <div className="grid">
            {rows.map((row) => (
              <div
                key={`${activeCategory}-${row.playerId}`}
                className={[
                  'grid items-center gap-2 border-b border-[rgba(11,27,69,0.06)] py-2.5 last:border-b-0',
                  showTeamNameOnDesktop
                    ? 'grid-cols-[2rem_minmax(0,1fr)_3.4rem] min-[901px]:grid-cols-[2.4rem_minmax(0,1fr)_minmax(0,0.9fr)_5rem] min-[901px]:gap-3'
                    : 'grid-cols-[2rem_minmax(0,1fr)_3.4rem] min-[901px]:grid-cols-[2.4rem_minmax(0,1fr)_5rem] min-[901px]:gap-3',
                ].join(' ')}
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
                {showTeamNameOnDesktop ? (
                  <span className="hidden truncate text-[0.82rem] text-[var(--color-text-muted)] min-[901px]:block">
                    {row.teamName}
                  </span>
                ) : null}
                <span className="justify-self-end text-right text-sm font-extrabold text-[var(--color-primary)]">
                  {row.average.toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          {footerLinkTo && footerLinkLabel ? (
            <div className="pt-4">
              <Link
                to={footerLinkTo}
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-4 py-3 text-sm font-extrabold text-white transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--color-accent)_88%,black)] focus-visible:bg-[color-mix(in_srgb,var(--color-accent)_88%,black)] min-[901px]:w-fit"
              >
                {footerLinkLabel}
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </section>
  )
}
