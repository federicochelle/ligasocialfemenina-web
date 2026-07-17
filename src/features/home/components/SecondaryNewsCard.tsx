import { Link } from 'react-router-dom'
import type { PublicNewsItem } from '../../news/types/news.types'
import { formatNewsDate } from '../../news/utils/formatNewsDate'

type SecondaryNewsCardProps = {
  article: PublicNewsItem
}

export function SecondaryNewsCard({ article }: SecondaryNewsCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.45rem] border border-[var(--color-line)] bg-white shadow-soft">
      <Link to={`/noticias/${article.slug}`} className="grid h-full min-h-[21rem] min-[901px]:min-h-[16.5rem]">
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt=""
            loading="lazy"
            className="h-36 w-full object-cover min-[901px]:h-[8.6rem]"
          />
        ) : (
          <div className="flex h-36 w-full items-center justify-center bg-[var(--color-accent-soft)] text-sm font-bold text-[var(--color-primary)] min-[901px]:h-[8.6rem]">
            Sin imagen disponible
          </div>
        )}
        <div className="grid h-full grid-rows-[auto_auto_1fr] gap-3 p-5">
          <span className="text-[0.7rem] font-extrabold tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {formatNewsDate(article.publishedAt, 'short')}
          </span>
          <h3 className="line-clamp-4 text-[1.08rem] leading-[1.16] text-[var(--color-primary)]">
            {article.title}
          </h3>
          <p className="line-clamp-3 text-[0.94rem] leading-[1.5] text-[var(--color-text-muted)]">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </article>
  )
}
