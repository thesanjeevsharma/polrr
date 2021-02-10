import React from 'react'

import { Loader } from 'components'
import { Article } from 'types/article'

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
              sort: 'popularity',
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
        <>
          {articles.map((article) => (
            <div>{article.title}</div>
          ))}
        </>
      )}
    </div>
  )
}

export default Home
