import { FixtureRoundCard } from '../components/FixtureRoundCard'
import { matchesPageMock } from '../mocks/matchesPage.mock'

export function MatchesPage() {
  return (
    <section className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
      <div className="rounded-[1.8rem] border border-[var(--color-line)] bg-white px-5 py-6 shadow-[0_18px_50px_rgba(5,12,31,0.12)] min-[901px]:px-8 min-[901px]:py-8">
        <div className="max-w-[48rem] pt-1 pb-2">
          <span className="mb-[0.9rem] inline-flex items-center gap-2 text-[0.78rem] font-extrabold tracking-[0.18em] text-[var(--color-accent)] uppercase before:h-px before:w-[2.4rem] before:bg-current before:opacity-55 before:content-['']">
            Partidos
          </span>
          <h1 className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] tracking-[-0.05em] text-[var(--color-primary)]">
            Fixture y resultados de la Liga Social Femenina.
          </h1>
        </div>

        <div className="mt-6 grid gap-6 min-[901px]:grid-cols-2">
          {matchesPageMock.map((round) => (
            <FixtureRoundCard key={round.id} round={round} />
          ))}
        </div>
      </div>
    </section>
  )
}
