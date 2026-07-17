import { Link } from 'react-router-dom'
import type { PublicNewsItem } from '../../news/types/news.types'
import { formatNewsDate } from '../../news/utils/formatNewsDate'

type FeaturedNewsCardProps = {
  article: PublicNewsItem
}

export function FeaturedNewsCard({ article }: FeaturedNewsCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-[var(--color-line)] bg-[rgba(255,255,255,0.78)] shadow-soft backdrop-blur">
      <Link to={`/noticias/${article.slug}`} className="grid h-full min-h-[27rem] min-[901px]:min-h-[31rem]">
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt=""
            loading="lazy"
            className="h-64 w-full object-cover min-[901px]:h-[20.5rem]"
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center bg-[var(--color-accent-soft)] text-sm font-bold text-[var(--color-primary)] min-[901px]:h-[20.5rem]">
            Sin imagen disponible
          </div>
        )}

        <div className="grid h-full grid-rows-[auto_auto_1fr] gap-4 p-5 min-[901px]:gap-5 min-[901px]:p-6">
          <span className="text-[0.74rem] font-extrabold tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {formatNewsDate(article.publishedAt, 'shortYear')}
          </span>
          <h3 className="line-clamp-3 text-[1.45rem] leading-[1.08] tracking-[-0.03em] text-[var(--color-primary)] min-[901px]:text-[1.9rem] min-[901px]:leading-[1.02]">
            {article.title}
          </h3>
          <p className="line-clamp-5 text-[0.98rem] leading-[1.55] text-[var(--color-text-muted)] min-[901px]:text-[1.08rem]">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </article>
  )
}
