import { Link } from 'react-router-dom'
import type { PublicNewsItem } from '../types/news.types'
import { formatNewsDate } from '../utils/formatNewsDate'

type MoreNewsCardProps = {
  article: PublicNewsItem
}

export function MoreNewsCard({ article }: MoreNewsCardProps) {
  return (
    <Link
      to={`/noticias/${article.slug}`}
      className="group grid min-h-[21rem] overflow-hidden rounded-[1.35rem] border border-[var(--color-line)] bg-white shadow-[0_10px_28px_rgba(9,18,44,0.06)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="overflow-hidden">
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt=""
            loading="lazy"
            className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] max-[900px]:h-48"
          />
        ) : (
          <div className="flex h-52 w-full items-center justify-center bg-[var(--color-accent-soft)] text-sm font-bold text-[var(--color-primary)] max-[900px]:h-48">
            Sin imagen disponible
          </div>
        )}
      </div>

      <div className="grid h-full grid-rows-[auto_auto_1fr] gap-3 p-5">
        <span className="text-[0.72rem] font-extrabold tracking-[0.14em] text-[var(--color-accent)] uppercase">
          {formatNewsDate(article.publishedAt, 'shortYear')}
        </span>
        <h2 className="line-clamp-4 text-[1.08rem] leading-[1.16] text-[var(--color-primary)]">
          {article.title}
        </h2>
        <p className="line-clamp-3 text-[0.94rem] leading-[1.5] text-[var(--color-text-muted)]">
          {article.excerpt}
        </p>
      </div>
    </Link>
  )
}
