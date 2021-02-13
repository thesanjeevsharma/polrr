import { Article } from 'types/article'

export const markSavedArticles = (articles: Article[]): Article[] => {
  const saved = localStorage.getItem('saved')
  const savedArticles: Article[] = saved ? JSON.parse(saved) : []

  if (savedArticles.length) {
    return articles.map((article) => {
      const exists = savedArticles.find(({ _id }) => _id === article._id)
      return { ...article, isSaved: Boolean(exists) }
    })
  }
  return articles.map((article) => ({ ...article, isSaved: false }))
}
