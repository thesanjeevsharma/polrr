import React from 'react'
import clsx from 'clsx'
import TimeAgo from 'react-timeago'

import { Button, Icon } from 'components'
import { IFRAME_ALLOWED } from 'constants/index'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { current } from 'store/features/newsSlice'
import { Article } from 'types/article'

import './ArticleCard.scss'
import { toggleSave } from 'store/features/userSlice'
import ImageFallback from 'components/ImageFallback'

interface ComponentProps {
  article: Article
}

const ArticleCard: React.FC<ComponentProps> = ({ article }) => {
  const dispatch = useAppDispatch()
  const { isLoggedIn, token, user } = useAppSelector((state) => state.user)

  const isExternal = !IFRAME_ALLOWED.includes(article.source.name)

  const openArticle = (): void => {
    if (isExternal) {
      window.open(article.url, '_blank')
    } else {
      dispatch(current(article))
    }
  }

  const save = (): void => {
    dispatch(toggleSave({ articleId: article._id, token: token! }))
  }

  return (
    <div className="ArticleCard">
      <div className="ArticleCard__Head">
        {article.urlToImage ? (
          <img
            alt={article.title}
            className="ArticleCard__Image"
            loading="lazy"
            src={article.urlToImage}
          />
        ) : (
          <ImageFallback text={article.source.name} />
        )}
      </div>
      <div className="ArticleCard__Body">
        <h3 className="ArticleCard__Title">{article.title}</h3>
        <div className="ArticleCard__Details">
          <h4 className="ArticleCard__Source"> {article.source.name} </h4>
          <TimeAgo className="ArticleCard__Time" date={article.publishedAt} />
        </div>
        <p className="ArticleCard__Description">{article.description}</p>
        <p className="ArticleCard__Author">{article.author}</p>
        <div className="ArticleCard__Footer">
          <Button className="ArticleCard__CTA" onClick={openArticle}>
            Read More
            {isExternal && (
              <Icon
                className="ArticleCard__CTA-icon"
                name="open-in-new"
                size={14}
              />
            )}
          </Button>
          {isLoggedIn && (
            <Icon
              name={
                user?.savedArticles.includes(article._id)
                  ? 'bookmark'
                  : 'bookmark-outline'
              }
              className={clsx(
                'ArticleCard__Save',
                user?.savedArticles.includes(article._id) &&
                  'ArticleCard__Save--filled'
              )}
              onClick={save}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
