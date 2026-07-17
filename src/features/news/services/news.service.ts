import { supabase } from '../../../services/supabaseClient'
import type { NewsRow, PublicNewsItem } from '../types/news.types'

const publicNewsColumns = 'id, title, excerpt, slug, content, cover_image, published_at'

export function mapNewsRow(newsRow: NewsRow): PublicNewsItem {
  return {
    id: newsRow.id,
    title: newsRow.title?.trim() || 'Noticia sin titulo',
    excerpt: newsRow.excerpt?.trim() || '',
    slug: newsRow.slug?.trim() || newsRow.id,
    content: newsRow.content?.trim() || '',
    coverImage: newsRow.cover_image,
    publishedAt: newsRow.published_at || '',
  }
}

export async function getLatestPublishedNews(limit = 5) {
  const { data, error } = await supabase
    .from('news')
    .select(publicNewsColumns)
    .eq('published', true)
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error('No pudimos obtener las ultimas noticias publicadas.')
  }

  return (data satisfies NewsRow[]).map(mapNewsRow)
}

export async function getPublishedNews() {
  const { data, error } = await supabase
    .from('news')
    .select(publicNewsColumns)
    .eq('published', true)
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })

  if (error) {
    throw new Error('No pudimos obtener las noticias publicadas.')
  }

  return (data satisfies NewsRow[]).map(mapNewsRow)
}

export async function getPublishedNewsBySlug(slug: string) {
  const { data, error } = await supabase
    .from('news')
    .select(publicNewsColumns)
    .eq('slug', slug)
    .eq('published', true)
    .not('published_at', 'is', null)
    .maybeSingle()

  if (error) {
    throw new Error('No pudimos obtener la noticia solicitada.')
  }

  if (!data) {
    return null
  }

  return mapNewsRow(data satisfies NewsRow)
}

export async function getRelatedPublishedNews(currentId: string, limit = 3) {
  const { data, error } = await supabase
    .from('news')
    .select(publicNewsColumns)
    .eq('published', true)
    .not('published_at', 'is', null)
    .neq('id', currentId)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error('No pudimos obtener mas noticias publicadas.')
  }

  return (data satisfies NewsRow[]).map(mapNewsRow)
}
