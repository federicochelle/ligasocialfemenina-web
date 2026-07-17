import { Link } from 'react-router-dom'

export function HeroSection() {
  return (
    <section className="relative grid min-h-[27rem] items-end gap-8 overflow-hidden rounded-[var(--radius-xl)] border border-[rgba(255,255,255,0.08)] bg-[radial-gradient(circle_at_top_left,rgba(246,68,160,0.24),transparent_26%),linear-gradient(135deg,rgba(7,17,45,1),rgba(11,27,69,0.96)_46%,rgba(24,47,100,0.94))] p-9 shadow-[0_32px_80px_rgba(8,17,41,0.24)] after:pointer-events-none after:absolute after:right-[-4rem] after:bottom-[-5rem] after:h-72 after:w-72 after:rounded-full after:bg-[radial-gradient(circle,rgba(246,68,160,0.16),transparent_72%)] max-[900px]:grid-cols-1 max-[900px]:min-h-auto max-[640px]:p-6 min-[901px]:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
      <div className="relative z-10 grid max-w-[42rem] gap-5">
        <span className="mb-0 inline-flex items-center gap-2 text-[0.78rem] font-extrabold tracking-[0.18em] text-[var(--color-text-on-dark)] uppercase before:h-px before:w-[2.4rem] before:bg-[rgba(255,210,234,0.62)] before:content-['']">
          Portada oficial
        </span>
        <h1 className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] tracking-[-0.05em] text-[var(--color-text-on-dark)]">
          Liga Social Femenina
          <br />
          de Basquetbol
        </h1>
        <p className="max-w-[32rem] text-[1.05rem] text-[rgba(248,250,255,0.76)]">
          Toda la actualidad, fixture, resultados y estadisticas de la liga.
        </p>
        <Link
          to="/partidos"
          className="inline-flex w-fit items-center justify-center rounded-full bg-[linear-gradient(135deg,#f95caf,#f644a0)] px-[1.2rem] py-[0.88rem] font-extrabold text-white shadow-[0_18px_30px_rgba(246,68,160,0.24)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px focus-visible:-translate-y-px"
        >
          Ver fixture
        </Link>
      </div>
      <div
        className="relative z-10 grid content-end gap-[0.85rem] self-stretch rounded-[1.6rem] bg-white/8 p-6 text-[var(--color-text-on-dark)] backdrop-blur-[14px] max-[640px]:p-[1.15rem]"
        aria-hidden="true"
      >
        <span className="text-[0.78rem] font-extrabold tracking-[0.16em] text-[rgba(255,210,234,0.82)] uppercase">
          Temporada activa
        </span>
        <strong className="text-[1.25rem] leading-[1.2]">
          Competencia publica lista para seguir partido a partido.
        </strong>
      </div>
    </section>
  )
}
