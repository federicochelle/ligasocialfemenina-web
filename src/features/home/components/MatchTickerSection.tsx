import { useRef } from 'react'
import type { HomeMatchTickerItem } from '../types/home.types'
import { MatchTickerCard } from './MatchTickerCard'

type MatchTickerSectionProps = {
  matches: HomeMatchTickerItem[]
  loading: boolean
  error: boolean
}

export function MatchTickerSection({ matches, loading, error }: MatchTickerSectionProps) {
  const railRef = useRef<HTMLDivElement | null>(null)

  const scrollRail = (direction: 'left' | 'right') => {
    const rail = railRef.current

    if (!rail) {
      return
    }

    const offset = direction === 'left' ? -420 : 420

    rail.scrollBy({
      left: offset,
      behavior: 'smooth',
    })
  }

  return (
    <section
      className="relative flex items-center gap-3 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(7,17,45,0.98),rgba(11,27,69,0.94))] px-[0.85rem] py-[0.7rem] shadow-[0_22px_42px_rgba(8,17,41,0.18)] max-[640px]:ml-[calc(50%-50vw)] max-[640px]:mr-[calc(50%-50vw)] max-[640px]:w-screen max-[640px]:rounded-none max-[640px]:px-3"
      aria-label="Partidos destacados"
    >
      <button
        type="button"
        className="inline-flex h-[2.2rem] w-[2.2rem] flex-none items-center justify-center rounded-full bg-white/8 text-[1.45rem] leading-none text-[rgba(248,250,255,0.92)] max-[900px]:hidden hover:bg-[rgba(255,255,255,0.14)] focus-visible:bg-[rgba(255,255,255,0.14)]"
        aria-label="Desplazar partidos hacia la izquierda"
        onClick={() => scrollRail('left')}
      >
        ‹
      </button>

      <div
        ref={railRef}
        className="grid flex-1 auto-cols-[minmax(11.5rem,13.5rem)] grid-flow-col gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-[640px]:auto-cols-[minmax(11rem,12.5rem)]"
      >
        {loading
          ? Array.from({ length: 4 }, (_, index) => (
              <div
                key={`ticker-loading-${index}`}
                className="grid h-[8.4rem] min-w-0 gap-[0.5rem] rounded-[0.35rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.12)] px-[0.8rem] py-[0.7rem] animate-pulse"
                aria-hidden="true"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="h-2.5 w-20 rounded-full bg-white/30" />
                  <span className="h-2.5 w-12 rounded-full bg-white/30" />
                </div>
                <div className="grid gap-[0.55rem]">
                  <div className="grid gap-1">
                    <span className="h-3.5 w-full rounded-full bg-white/35" />
                    <span className="h-2.5 w-10 rounded-full bg-white/30" />
                  </div>
                  <div className="grid gap-1">
                    <span className="h-3.5 w-full rounded-full bg-white/35" />
                    <span className="h-2.5 w-10 rounded-full bg-white/30" />
                  </div>
                </div>
                <div className="mt-auto grid gap-1">
                  <span className="h-2.5 w-16 rounded-full bg-white/30" />
                  <span className="h-2.5 w-10 rounded-full bg-white/30" />
                </div>
              </div>
            ))
          : error
            ? (
                <div className="flex min-h-[8.4rem] min-w-[11.5rem] items-center rounded-[0.35rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-[0.8rem] py-[0.7rem] text-[0.74rem] font-bold tracking-[0.04em] text-[rgba(248,250,255,0.84)]">
                  No pudimos cargar los partidos destacados.
                </div>
              )
            : matches.length === 0
              ? (
                  <div className="flex min-h-[8.4rem] min-w-[11.5rem] items-center rounded-[0.35rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-[0.8rem] py-[0.7rem] text-[0.74rem] font-bold tracking-[0.04em] text-[rgba(248,250,255,0.84)]">
                    Todavia no hay partidos para mostrar.
                  </div>
                )
              : matches.map((match) => (
                  <div key={match.id} className="min-w-0">
                    <MatchTickerCard match={match} />
                  </div>
                ))}
      </div>

      <button
        type="button"
        className="inline-flex h-[2.2rem] w-[2.2rem] flex-none items-center justify-center rounded-full bg-white/8 text-[1.45rem] leading-none text-[rgba(248,250,255,0.92)] max-[900px]:hidden hover:bg-[rgba(255,255,255,0.14)] focus-visible:bg-[rgba(255,255,255,0.14)]"
        aria-label="Desplazar partidos hacia la derecha"
        onClick={() => scrollRail('right')}
      >
        ›
      </button>
    </section>
  )
}
