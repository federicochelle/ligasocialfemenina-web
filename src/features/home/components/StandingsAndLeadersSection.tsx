import { LeadersSection } from './LeadersSection'
import { StandingsPreviewSection } from './StandingsPreviewSection'
import type {
  StatisticsCategoryPreview,
  PublicStandingRow,
} from '../../statistics/types/statistics.types'

type StandingsAndLeadersSectionProps = {
  standings: PublicStandingRow[]
  leaders: StatisticsCategoryPreview[]
}

export function StandingsAndLeadersSection({
  standings,
  leaders,
}: StandingsAndLeadersSectionProps) {
  return (
    <section className="col-span-12 grid gap-6 min-[901px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <StandingsPreviewSection standings={standings} />
      <LeadersSection leaders={leaders} />
    </section>
  )
}
