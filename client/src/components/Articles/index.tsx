import React from 'react'

import { ArticleCard } from 'components'
import { Article } from 'types/article'

import './Articles.scss'

interface ComponentProps {
  articles: Article[]
  toggleSaveArticleEventFired(): void
}

const Articles: React.FC<ComponentProps> = ({
  articles,
  toggleSaveArticleEventFired,
}) => {
  const toggleSave = (article: Article) => {
    try {
      const saved = localStorage.getItem('saved')
      const savedArticles: Article[] = saved ? JSON.parse(saved) : []

      if (article.isSaved) {
        const updatedSavedArticles = savedArticles.filter(
          ({ _id }) => _id !== article._id
        )
        localStorage.setItem('saved', JSON.stringify(updatedSavedArticles))
      } else {
        const updatedSavedArticles = [
          ...savedArticles,
          { ...article, isSaved: true },
        ]
        localStorage.setItem('saved', JSON.stringify(updatedSavedArticles))
      }

      toggleSaveArticleEventFired()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="Articles">
      {articles.map((article) => (
        <ArticleCard
          article={article}
          key={article._id}
          toggleSave={toggleSave}
        />
      ))}
    </div>
  )
}

export default Articles
