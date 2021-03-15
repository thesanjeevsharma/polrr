import React from 'react'

import { Articles, Loader } from 'components'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import './Saved.scss'
import { loadSavedArticles } from 'store/features/userSlice'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const { savedArticles, status } = useAppSelector((state) => state.user)

  React.useEffect(() => {
    const token = localStorage.getItem('polrr-token')
    if (token) {
      dispatch(loadSavedArticles(token))
    }
  }, [dispatch])

  if (status === 'rejected') return <p>Something went wrong!</p>
  return (
    <div className="Saved">
      {status === 'pending' ? (
        <Loader />
      ) : (
        <>
          <div className="Saved__Count">
            Saved Articles({savedArticles.length})
          </div>
          <Articles articles={savedArticles} />
        </>
      )}
    </div>
  )
}

export default Home
