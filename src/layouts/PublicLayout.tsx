import { Outlet } from 'react-router-dom'
import { ScrollToTop } from '../components/ScrollToTop'
import { BrandMark } from '../components/navigation/BrandMark'
import { NavBar } from '../components/navigation/NavBar'
import { SocialLinks } from '../components/navigation/SocialLinks'

export function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-1 px-0 pt-24 pb-16 max-[860px]:pt-[6.25rem] max-[640px]:pb-12">
          <Outlet />
        </main>
        <footer className="mt-2 bg-[var(--color-primary)] px-0 py-5">
          <div className="public-page-shell flex flex-col items-center gap-4 min-[861px]:grid min-[861px]:grid-cols-[auto_1fr_auto] min-[861px]:items-center min-[861px]:gap-6">
            <BrandMark
              className="flex justify-center min-[861px]:justify-start"
              imageClassName="h-[5.5rem] w-auto max-w-full object-contain min-[861px]:h-[6.25rem]"
            />

            <span className="block text-center text-sm text-white/82 min-[861px]:justify-self-center min-[861px]:text-center">
              © 2026 Liga Social Femenina de Básquetbol
            </span>

            <SocialLinks
              className="flex items-center justify-center gap-3 min-[861px]:justify-self-end"
              linkClassName="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[var(--color-accent)] transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:text-[var(--color-accent)]"
              iconClassName="h-[1.62rem] w-[1.62rem]"
            />
          </div>
        </footer>
      </div>
    </>
  )
}
