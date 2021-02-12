import React from 'react'
import TimeAgo from 'react-timeago'

import { Article } from 'types/article'

import './ArticleCard.scss'

interface ComponentProps {
  article: Article
}

const ArticleCard: React.FC<ComponentProps> = ({ article }) => {
  return (
    <div className="ArticleCard">
      <div className="ArticleCard__Head">
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
          <button className="ArticleCard__CTA">Read More</button>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
