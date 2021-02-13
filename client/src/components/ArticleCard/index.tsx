import React from 'react'
import TimeAgo from 'react-timeago'

import { Icon } from 'components'
import { Article } from 'types/article'

import './ArticleCard.scss'

interface ComponentProps {
  article: Article
  toggleSave(article: Article): void
}

const ArticleCard: React.FC<ComponentProps> = ({ article, toggleSave }) => {
  const openArticle = () => window.open(article.url, '_blank')

  return (
    <div className="ArticleCard">
      <div className="ArticleCard__Head">
        <button
          className="ArticleCard__Save"
          onClick={() => toggleSave(article)}
        >
          <Icon name={article.isSaved ? 'bookmark' : 'bookmark-outline'} />
        </button>
        <span className="ArticleCard__Source"> {article.source.name} </span>
        <img
          alt={article.title}
          className="ArticleCard__Image"
          src={article.urlToImage}
        />
      </div>
      <div className="ArticleCard__Body">
        <h3 className="ArticleCard__Title">{article.title}</h3>
        <p className="ArticleCard__Details">
          <TimeAgo
            className="ArticleCard__Details--light"
            date={article.publishedAt}
          />
          - {article.author}
        </p>
        <div className="ArticleCard__Description">{article.description}</div>
        <div className="ArticleCard__Footer">
          <button className="ArticleCard__CTA" onClick={openArticle}>
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
