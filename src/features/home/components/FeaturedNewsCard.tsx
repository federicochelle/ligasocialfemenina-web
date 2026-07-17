import { Link } from 'react-router-dom'
import type { PublicNewsItem } from '../../news/types/news.types'
import { formatNewsDate } from '../../news/utils/formatNewsDate'

type FeaturedNewsCardProps = {
  article: PublicNewsItem
}

export function FeaturedNewsCard({ article }: FeaturedNewsCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-[var(--color-line)] bg-[rgba(255,255,255,0.78)] shadow-soft backdrop-blur">
      {article.coverImage ? (
        <img
          src={article.coverImage}
          alt=""
          loading="lazy"
          className="h-52 w-full object-cover min-[901px]:h-[17.5rem]"
        />
      ) : (
        <div className="flex h-52 w-full items-center justify-center bg-[var(--color-accent-soft)] text-sm font-bold text-[var(--color-primary)] min-[901px]:h-[17.5rem]">
          Sin imagen disponible
        </div>
      )}

      <div className="grid gap-4 p-5">
        <span className="text-[0.74rem] font-extrabold tracking-[0.14em] text-[var(--color-accent)] uppercase">
          {formatNewsDate(article.publishedAt, 'shortYear')}
        </span>
        <div className="grid gap-3">
          <h3 className="text-[1.45rem] leading-[1.08] tracking-[-0.03em] text-[var(--color-primary)]">
            {article.title}
          </h3>
          <p className="text-[0.98rem] text-[var(--color-text-muted)]">{article.excerpt}</p>
        </div>

        <Link
          to={`/noticias/${article.slug}`}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[rgba(246,68,160,0.12)] px-4 py-3 text-sm font-extrabold text-[var(--color-accent)] transition-colors duration-200 hover:bg-[rgba(246,68,160,0.18)] focus-visible:bg-[rgba(246,68,160,0.18)]"
        >
          Leer noticia
        </Link>
      </div>
    </article>
  )
}
