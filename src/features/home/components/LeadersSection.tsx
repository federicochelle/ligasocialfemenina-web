import { useMemo, useState } from 'react'
import { LeaderRankingsPanel } from './LeaderRankingsPanel'
import {
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
    <LeaderRankingsPanel
      title="Lideres de la liga"
      activeCategory={activeTab}
      availableCategories={[...availableByCategory.keys()]}
      rows={activeLeader?.rows ?? []}
      onCategoryChange={setActiveTab}
      emptyMessage={leaders.length === 0 ? 'Sin lideres disponibles.' : 'Sin datos para esta categoria.'}
      footerLinkTo="/estadisticas"
      footerLinkLabel="Ver todas"
      showTeamNameOnDesktop
    />
  )
}
