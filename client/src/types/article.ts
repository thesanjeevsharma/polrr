export interface Source {
  id: string | null
  name: string
}

export interface Article {
  _id: string
  author: string
  content: string
  description: string
  publishedAt: Date
  source: Source
  title: string
  url: string
  urlToImage: string
}
