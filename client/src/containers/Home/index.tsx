import React from 'react'

import { fetchNews } from 'api'
import { Articles, Loader } from 'components'
import { useScrollListener } from 'hooks'
import { Article } from 'types/article'
import { markSavedArticles } from 'utils/articles'

import './Home.scss'

const Home: React.FC = () => {
  const [articles, setArticles] = React.useState<Article[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  const skip = React.useRef(0)
  const limit = React.useRef(20)

  const endReached = useScrollListener()

  React.useEffect(() => {
    ;(async () => {
      try {
        const data = await fetchNews({
          from: 'everything',
          limit: limit.current,
          skip: skip.current,
        })
        if (data.success) {
          const markedArticles = markSavedArticles(data.data.articles)
          setArticles(markedArticles)
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
            from: 'everything',
            limit: limit.current,
            skip: skip.current,
          })
          if (data.success) {
            const markedArticles = markSavedArticles(data.data.articles)
            setArticles((oldArticles) => [...oldArticles, ...markedArticles])
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

  const toggleSaveArticleEventFired = () => {
    setArticles(markSavedArticles(articles))
  }

  return (
    <div className="Home">
      {loading ? (
        <Loader />
      ) : (
        <Articles
          articles={articles}
          toggleSaveArticleEventFired={toggleSaveArticleEventFired}
        />
      )}
    </div>
  )
}

export default Home
