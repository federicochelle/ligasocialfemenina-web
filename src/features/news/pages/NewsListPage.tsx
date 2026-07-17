import { useEffect, useState } from 'react'
import { PageIntro } from '../../../components/placeholders/PageIntro'
import { NewsListRow } from '../components/NewsListRow'
import { getPublishedNews } from '../services/news.service'
import type { PublicNewsItem } from '../types/news.types'

export function NewsListPage() {
  const [news, setNews] = useState<PublicNewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true

    void getPublishedNews()
      .then((data) => {
        if (isMounted) {
          setNews(data)
          setHasError(false)
        }
      })
      .catch((error: unknown) => {
        console.error(error)
        if (isMounted) {
          setNews([])
          setHasError(true)
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
  }, [])

  return (
    <section className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
      <div className="[&_h1]:mb-5 [&_h1]:text-white [&_p]:text-white/78 [&_span]:text-[var(--color-accent)]">
        <PageIntro
          eyebrow="Noticias"
          title="Toda la actualidad de la Liga Social Femenina."
          description="Segui las ultimas novedades, resultados, anuncios y coberturas de la competencia en un solo lugar."
        />
      </div>

      <div className="grid gap-8 pb-4">
        {isLoading ? <p className="text-white/82">Cargando noticias...</p> : null}

        {!isLoading && hasError ? (
          <p className="text-white/82">No pudimos cargar las noticias por ahora.</p>
        ) : null}

        {!isLoading && !hasError && news.length === 0 ? (
          <p className="text-white/82">Aun no hay noticias publicadas.</p>
        ) : null}

        {!isLoading && !hasError
          ? news.map((article) => <NewsListRow key={article.id} article={article} />)
          : null}
      </div>
    </section>
  )
}
