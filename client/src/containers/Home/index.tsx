import React from 'react'
import clsx from 'clsx'

import { fetchNews } from 'api'
import { Articles, Button, Loader } from 'components'
import { useScrollListener } from 'hooks'
import { Article } from 'types/article'
import { markSavedArticles } from 'utils/articles'

import './Home.scss'

const Home: React.FC = () => {
  const [articles, setArticles] = React.useState<Article[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [from, setFrom] = React.useState<string>('everything')

  const skip = React.useRef(0)
  const limit = React.useRef(20)

  const endReached = useScrollListener()

  const fetchNewsFunc = React.useCallback(async () => {
    try {
      const data = await fetchNews({
        from,
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
  }, [from])

  React.useEffect(() => {
    fetchNewsFunc()
  }, [fetchNewsFunc])

  React.useEffect(() => {
    if (endReached) {
      fetchNewsFunc()
    }
  }, [endReached, fetchNewsFunc])

  React.useEffect(() => {
    skip.current = 0
    setArticles([])
    fetchNewsFunc()
  }, [from, fetchNewsFunc])

  const toggleSaveArticleEventFired = () => {
    setArticles(markSavedArticles(articles))
  }

  return (
    <div className="Home">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="Home__TabWrapper">
            <button
              className={clsx(
                'Home__Tab',
                from === 'everything' && 'Home__Tab--active'
              )}
              onClick={() => setFrom('everything')}
            >
              All
            </button>
            <button
              className={clsx(
                'Home__Tab',
                from === 'top-headlines' && 'Home__Tab--active'
              )}
              onClick={() => setFrom('top-headlines')}
            >
              Top Picks
            </button>
          </div>
          <Articles
            articles={articles}
            toggleSaveArticleEventFired={toggleSaveArticleEventFired}
          />
        </>
      )}
    </div>
  )
}

export default Home
