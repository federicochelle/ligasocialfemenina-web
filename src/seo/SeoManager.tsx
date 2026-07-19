import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_NAME = 'Liga Social Femenina de Básquetbol'
const SITE_URL = 'https://ligasocialfemenina.com.uy'
const DEFAULT_TITLE = `${SITE_NAME} | Noticias, partidos y estadísticas`
const DEFAULT_DESCRIPTION =
  'Liga Social Femenina de Básquetbol en Uruguay: seguí noticias, fixture, resultados, estadísticas y la actualidad de la competencia en un solo lugar.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.webp`

type SeoConfig = {
  title: string
  description: string
  path: string
  type?: string
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function getSeoConfig(pathname: string): SeoConfig {
  if (pathname === '/noticias') {
    return {
      title: `Noticias | ${SITE_NAME}`,
      description:
        'Seguí las últimas novedades, coberturas, anuncios y actualidad de la Liga Social Femenina de Básquetbol.',
      path: pathname,
    }
  }

  if (pathname.startsWith('/noticias/')) {
    return {
      title: `Noticias | ${SITE_NAME}`,
      description:
        'Leé la cobertura y actualidad de la Liga Social Femenina de Básquetbol en su sección de noticias.',
      path: pathname,
      type: 'article',
    }
  }

  if (pathname === '/partidos') {
    return {
      title: `Partidos y resultados | ${SITE_NAME}`,
      description:
        'Consultá el fixture, los próximos encuentros y los resultados recientes de la Liga Social Femenina de Básquetbol.',
      path: pathname,
    }
  }

  if (pathname === '/estadisticas') {
    return {
      title: `Estadísticas | ${SITE_NAME}`,
      description:
        'Revisá líderes, rendimientos y estadísticas destacadas de la Liga Social Femenina de Básquetbol.',
      path: pathname,
    }
  }

  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: pathname === '/' ? '/' : pathname,
  }
}

export function SeoManager() {
  const location = useLocation()

  useEffect(() => {
    const normalizedPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '')
    const seo = getSeoConfig(normalizedPath)
    const canonicalUrl = `${SITE_URL}${seo.path === '/' ? '/' : seo.path}`

    document.title = seo.title

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
    upsertMeta('name', 'theme-color', '#1d4ed8')

    upsertMeta('property', 'og:locale', 'es_UY')
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:type', seo.type ?? 'website')
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', DEFAULT_OG_IMAGE)
    upsertMeta('property', 'og:image:type', 'image/webp')
    upsertMeta('property', 'og:image:width', '1600')
    upsertMeta('property', 'og:image:height', '800')
    upsertMeta('property', 'og:image:alt', `Identidad visual de ${SITE_NAME}`)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:image', DEFAULT_OG_IMAGE)
    upsertMeta('name', 'twitter:image:alt', `Identidad visual de ${SITE_NAME}`)

    upsertLink('canonical', canonicalUrl)
  }, [location.pathname])

  return null
}
