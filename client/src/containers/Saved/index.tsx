import React from 'react'

import { Articles, Loader } from 'components'
import { Article } from 'types/article'

import './Saved.scss'

const Home: React.FC = () => {
  const [articles, setArticles] = React.useState<Article[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  return (
    <div className="Saved">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="Saved__Count">Saved Articles({articles.length})</div>
          <Articles articles={articles} />
        </>
      )}
    </div>
  )
}

export default Home
