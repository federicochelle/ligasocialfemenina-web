import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BrandMark } from './BrandMark'
import { SocialLinks } from './SocialLinks'

const navigationLinks = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/noticias', label: 'Noticias' },
  { to: '/partidos', label: 'Partidos' },
  { to: '/estadisticas', label: 'Estadisticas' },
]

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    [
      'relative inline-flex items-center px-1 py-1 text-[1.03rem] font-semibold tracking-[0.02em] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:transition-opacity after:duration-200',
      isActive
        ? 'text-[var(--color-accent)] after:bg-[var(--color-accent)] after:opacity-100'
        : 'text-white/80 after:opacity-0 hover:text-white focus-visible:text-white',
    ].join(' ')

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[var(--color-primary)] shadow-[0_10px_30px_rgba(6,15,39,0.18)]">
      <div className="public-page-shell flex min-h-[4.5rem] items-center justify-between gap-6">
        <NavLink to="/" className="inline-flex shrink-0 items-center" onClick={handleCloseMenu}>
          <BrandMark imageClassName="h-12 w-[11rem] shrink-0 object-contain" />
        </NavLink>

        <button
          type="button"
          className="hidden h-11 w-11 flex-col items-center justify-center gap-[0.28rem] text-white max-[860px]:inline-flex"
          aria-expanded={isMenuOpen}
          aria-label="Abrir menu de navegacion"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <span
            className={`h-0.5 w-[1.15rem] rounded-full bg-current transition duration-200 ${
              isMenuOpen ? 'translate-y-[6px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-[1.15rem] rounded-full bg-current transition duration-200 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.5 w-[1.15rem] rounded-full bg-current transition duration-200 ${
              isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </button>

        <nav
          className={[
            'absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 max-[860px]:left-4 max-[860px]:right-4 max-[860px]:top-[calc(100%+0.55rem)] max-[860px]:translate-x-0 max-[860px]:flex-col max-[860px]:items-stretch max-[860px]:gap-1 max-[860px]:rounded-xl max-[860px]:border max-[860px]:border-white/10 max-[860px]:bg-[var(--color-primary)] max-[860px]:p-4 max-[860px]:shadow-[0_18px_40px_rgba(5,12,31,0.26)] min-[861px]:flex',
            isMenuOpen ? 'max-[860px]:flex' : '',
          ].join(' ')}
        >
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={navLinkClassName}
              onClick={handleCloseMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <SocialLinks
          className="hidden items-center gap-3 min-[861px]:flex"
          linkClassName="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[var(--color-accent)] transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:text-[var(--color-accent)]"
          iconClassName="h-[1.62rem] w-[1.62rem]"
        />
      </div>
    </header>
  )
}
