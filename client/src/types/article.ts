export interface Source {
  id: string | null
  name: string
}

export interface Article {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: Date
  content: string
}
