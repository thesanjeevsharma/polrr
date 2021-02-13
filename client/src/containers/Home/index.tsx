import React from 'react'

import { fetchNews } from 'api'
import { ArticleCard, Loader } from 'components'
import { useScrollListener } from 'hooks'
import { Article } from 'types/article'

import './Home.scss'

const Home: React.FC = () => {
  const [articles, setArticles] = React.useState<Article[]>([])
  const [loading, setLoading] = React.useState<Boolean>(true)

  const skip = React.useRef(0)
  const limit = React.useRef(20)

  const endReached = useScrollListener()

  React.useEffect(() => {
    ;(async () => {
      try {
        const data = await fetchNews({
          skip: skip.current,
          limit: limit.current,
          from: 'everything',
        })
        if (data.success) {
          setArticles(data.data.articles)
          skip.current += limit.current
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  React.useEffect(() => {
    if (endReached) {
      ;(async () => {
        try {
          const data = await fetchNews({
            skip: skip.current,
            limit: limit.current,
            from: 'everything',
          })
          if (data.success) {
            setArticles((oldArticles) => [
              ...oldArticles,
              ...data.data.articles,
            ])
            skip.current += limit.current
          }
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [endReached])

  return (
    <div className="Home">
      {loading ? (
        <Loader />
      ) : (
        <div className="Home__Articles">
          {articles.map((article, index) => (
            <ArticleCard article={article} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
