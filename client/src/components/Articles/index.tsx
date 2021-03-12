import React from 'react'

import { ArticleCard } from 'components'
import { Article } from 'types/article'

import './Articles.scss'

interface ComponentProps {
  articles: Article[]
}

const Articles: React.FC<ComponentProps> = ({ articles }) => {
  return (
    <div className="Articles">
      {articles.map((article) => (
        <ArticleCard article={article} key={article._id} />
      ))}
    </div>
  )
}

export default Articles
