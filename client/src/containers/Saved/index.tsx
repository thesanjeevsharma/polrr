import React from 'react'
import { useHistory } from 'react-router'

import { Articles, Loader } from 'components'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import './Saved.scss'
import { loadSavedArticles } from 'store/features/userSlice'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const {
    savedArticles,
    status,
    isLoggedIn,
    token,
    userStatus,
  } = useAppSelector((state) => state.user)

  React.useEffect(() => {
    if (userStatus !== 'pending') {
      if (isLoggedIn && token) {
        dispatch(loadSavedArticles(token))
      } else {
        history.replace('/')
      }
    }
  }, [dispatch, isLoggedIn, history, token, userStatus])

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
