import { Link } from 'react-router-dom'
import { HomeSectionEmptyState } from './HomeSectionEmptyState'
import { FeaturedNewsCard } from './FeaturedNewsCard'
import { SecondaryNewsCard } from './SecondaryNewsCard'
import type { PublicNewsItem } from '../../news/types/news.types'

type NewsPortalSectionProps = {
  articles: PublicNewsItem[]
  hasError?: boolean
}

export function NewsPortalSection({
  articles,
  hasError = false,
}: NewsPortalSectionProps) {
  const [featuredArticle, ...secondaryArticles] = articles

  if (!featuredArticle) {
    return (
      <section className="col-span-12 w-full min-w-0 rounded-[1.6rem] bg-white px-4 py-5 min-[901px]:px-5 min-[901px]:py-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <span className="text-[0.8rem] font-extrabold tracking-[0.18em] text-[var(--color-accent)] uppercase">
            Ultimas noticias
          </span>

          <Link
            to="/noticias"
            className="shrink-0 text-sm font-extrabold text-[var(--color-primary)] transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:text-[var(--color-accent)]"
          >
            Ver todas →
          </Link>
        </div>

        <HomeSectionEmptyState
          message={
            hasError
              ? 'No pudimos cargar las noticias por ahora.'
              : 'Aun no hay noticias publicadas.'
          }
        />
      </section>
    )
  }

  return (
    <section className="col-span-12 w-full min-w-0 rounded-[1.6rem] bg-white px-4 py-5 min-[901px]:px-5 min-[901px]:py-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <span className="text-[0.8rem] font-extrabold tracking-[0.18em] text-[var(--color-accent)] uppercase">
          Ultimas noticias
        </span>

        <Link
          to="/noticias"
          className="shrink-0 text-sm font-extrabold text-[var(--color-primary)] transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:text-[var(--color-accent)]"
        >
          Ver todas →
        </Link>
      </div>

      <div className="grid gap-6 min-[901px]:grid-cols-[0.95fr_1.05fr]">
        <FeaturedNewsCard article={featuredArticle} />

        <div className="grid gap-5 min-[901px]:grid-cols-2">
          {secondaryArticles.map((article) => (
            <SecondaryNewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
