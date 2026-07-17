import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageIntro } from '../../../components/placeholders/PageIntro'
import { MoreNewsCard } from '../components/MoreNewsCard'
import {
  getPublishedNewsBySlug,
  getRelatedPublishedNews,
} from '../services/news.service'
import type { PublicNewsItem } from '../types/news.types'
import { formatNewsDate } from '../utils/formatNewsDate'

export function NewsDetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState<PublicNewsItem | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<PublicNewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRelatedLoading, setIsRelatedLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true

    if (!slug) {
      setArticle(null)
      setRelatedArticles([])
      setIsLoading(false)
      setIsRelatedLoading(false)
      return () => {
        isMounted = false
      }
    }

    setIsLoading(true)
    setHasError(false)
    setIsRelatedLoading(true)
    setRelatedArticles([])

    void getPublishedNewsBySlug(slug)
      .then((data) => {
        if (!isMounted) {
          return
        }

        setArticle(data)

        if (!data) {
          setRelatedArticles([])
          setIsRelatedLoading(false)
          return
        }

        void getRelatedPublishedNews(data.id, 3)
          .then((relatedData) => {
            if (isMounted) {
              setRelatedArticles(relatedData)
            }
          })
          .catch((error: unknown) => {
            console.error(error)
            if (isMounted) {
              setRelatedArticles([])
            }
          })
          .finally(() => {
            if (isMounted) {
              setIsRelatedLoading(false)
            }
          })
      })
      .catch((error: unknown) => {
        console.error(error)
        if (isMounted) {
          setArticle(null)
          setRelatedArticles([])
          setHasError(true)
          setIsRelatedLoading(false)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [slug])

  const paragraphs = useMemo(() => {
    if (!article?.content.trim()) {
      return []
    }

    return article.content
      .split(/\n\s*\n/g)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
  }, [article?.content])

  if (isLoading) {
    return (
      <section className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
        <p className="text-white/82">Cargando noticia...</p>
      </section>
    )
  }

  if (hasError) {
    return (
      <section className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
        <div className="[&_h1]:mb-5 [&_h1]:text-white [&_p]:text-white/78 [&_span]:text-[var(--color-accent)]">
          <PageIntro
            eyebrow="Noticias"
            title="No pudimos cargar esta noticia."
            description="Proba nuevamente en unos minutos."
          />
        </div>
      </section>
    )
  }

  if (!article) {
    return (
      <section className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
        <div className="[&_h1]:mb-5 [&_h1]:text-white [&_p]:text-white/78 [&_span]:text-[var(--color-accent)]">
          <PageIntro
            eyebrow="Noticias"
            title="La noticia no existe o ya no esta publicada."
            description="Revisa el enlace o volve al listado para seguir navegando."
          />
        </div>
      </section>
    )
  }

  return (
    <section className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
      <article className="rounded-[1.8rem] border border-[var(--color-line)] bg-white px-5 py-6 shadow-[0_18px_50px_rgba(5,12,31,0.12)] min-[901px]:px-8 min-[901px]:py-8">
        <div className="flex w-full flex-col gap-6">
          <span className="text-[0.78rem] font-extrabold tracking-[0.18em] text-[var(--color-accent)] uppercase">
            {formatNewsDate(article.publishedAt, 'long')}
          </span>

          <div className="grid max-w-[58rem] gap-4">
            <h1 className="text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.96] tracking-[-0.05em] text-[var(--color-primary)]">
              {article.title}
            </h1>
            <p className="max-w-[52rem] text-[1.08rem] leading-[1.65] font-medium text-[var(--color-text-muted)] min-[901px]:text-[1.14rem]">
              {article.excerpt}
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.6rem] min-[901px]:mx-auto min-[901px]:w-full min-[901px]:max-w-[50rem]">
            {article.coverImage ? (
              <img
                src={article.coverImage}
                alt=""
                loading="lazy"
                className="h-[18.5rem] w-full object-cover min-[901px]:h-[26rem]"
              />
            ) : (
              <div className="flex h-[18.5rem] w-full items-center justify-center bg-[var(--color-accent-soft)] text-sm font-bold text-[var(--color-primary)] min-[901px]:h-[26rem]">
                Sin imagen disponible
              </div>
            )}
          </div>

          <div className="grid max-w-[58rem] gap-5 text-[1.04rem] leading-[1.78] font-medium text-[var(--color-text)]">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <p key={`${article.slug}-${index}`}>{paragraph}</p>
              ))
            ) : (
              <p>Esta noticia no tiene contenido disponible todavia.</p>
            )}
          </div>
        </div>
      </article>

      <section className="grid gap-10 pt-6 min-[901px]:gap-10 min-[901px]:pt-12">
        <h2 className="text-[0.92rem] font-extrabold tracking-[0.16em] text-white uppercase">
          Mas noticias
        </h2>

        <div className="grid gap-10 min-[901px]:grid-cols-3">
          {isRelatedLoading ? <p className="text-white/82">Cargando mas noticias...</p> : null}
          {!isRelatedLoading
            ? relatedArticles.map((relatedArticle) => (
                <MoreNewsCard key={relatedArticle.id} article={relatedArticle} />
              ))
            : null}
          {!isRelatedLoading && relatedArticles.length === 0 ? (
            <p className="text-white/82">No hay mas noticias publicadas por ahora.</p>
          ) : null}
        </div>
      </section>
    </section>
  )
}
