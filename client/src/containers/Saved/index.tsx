import React from 'react'

import { Articles, Loader } from 'components'
import { Article } from 'types/article'

import './Saved.scss'

const Home: React.FC = () => {
  const [articles, setArticles] = React.useState<Article[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    ;(async () => {
      try {
        const saved = localStorage.getItem('saved')
        const savedArticles = saved ? JSON.parse(saved) : []
        setArticles(savedArticles)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const toggleSaveArticleEventFired = () => {
    const saved = localStorage.getItem('saved')
    const savedArticles = saved ? JSON.parse(saved) : []
    setArticles(savedArticles)
  }

  return (
    <div className="Saved">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="Saved__Count">Saved Articles({articles.length})</div>
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
