import React from 'react'

import { ArticleCard, Loader } from 'components'
import { Article } from 'types/article'

import './Home.scss'

const Home: React.FC = () => {
  const [articles, setArticles] = React.useState<Article[]>([])
  const [loading, setLoading] = React.useState<Boolean>(true)

  React.useEffect(() => {
    ;(async () => {
      try {
        const url =
          process.env.NODE_ENV === 'development'
            ? `http://localhost:4000/api/news`
            : `/api/news`
        const data = await (
          await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lang: 'en',
              query: 'climate change',
              sort: 'relevancy',
            }),
          })
        ).json()

        if (data.success) {
          setArticles(data.data.articles)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

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
