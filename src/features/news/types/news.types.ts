export type PublicNewsItem = {
  id: string
  title: string
  excerpt: string
  slug: string
  content: string
  coverImage: string | null
  publishedAt: string
}

export type NewsRow = {
  id: string
  title: string | null
  excerpt: string | null
  slug: string | null
  content: string | null
  cover_image: string | null
  published_at: string | null
}
