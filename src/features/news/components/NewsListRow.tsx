import { Link } from 'react-router-dom'
import type { PublicNewsItem } from '../types/news.types'
import { formatNewsDate } from '../utils/formatNewsDate'

type NewsListRowProps = {
  article: PublicNewsItem
}

export function NewsListRow({ article }: NewsListRowProps) {
  return (
    <Link
      to={`/noticias/${article.slug}`}
      className="group grid gap-0 overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white shadow-[0_10px_30px_rgba(9,18,44,0.06)] transition-transform duration-200 hover:-translate-y-0.5 min-[901px]:grid-cols-[22rem_minmax(0,1fr)]"
    >
      <div className="overflow-hidden">
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt=""
            loading="lazy"
            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] max-[900px]:h-56"
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center bg-[var(--color-accent-soft)] text-sm font-bold text-[var(--color-primary)] max-[900px]:h-56">
            Sin imagen disponible
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col justify-center gap-4 px-6 py-6 min-[901px]:px-8">
        <span className="text-[0.76rem] font-extrabold tracking-[0.14em] text-[var(--color-accent)] uppercase">
          {formatNewsDate(article.publishedAt, 'long')}
        </span>
        <h2 className="text-[1.45rem] leading-[1.08] tracking-[-0.03em] text-[var(--color-primary)] min-[901px]:text-[1.65rem]">
          {article.title}
        </h2>
        <p className="line-clamp-3 max-w-[52rem] text-[1rem] leading-[1.55] text-[var(--color-text-muted)]">
          {article.excerpt}
        </p>
      </div>
    </Link>
  )
}
