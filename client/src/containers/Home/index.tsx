import React from 'react'
import clsx from 'clsx'

import { fetchNews } from 'store/features/newsSlice'
import { Articles, Loader } from 'components'
import { LIMIT } from 'constants/index'
import { useScrollListener } from 'hooks'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import './Home.scss'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const { articles, status } = useAppSelector((state) => state.news)

  const [from, setFrom] = React.useState<string>('everything')
  const [skip, setSkip] = React.useState<number>(0)

  const endReached = useScrollListener()

  React.useEffect(() => {
    dispatch(
      fetchNews({
        from,
        skip,
      })
    )
  }, [dispatch, from, skip])

  React.useEffect(() => {
    if (endReached) {
      setSkip((oldSkip) => oldSkip + LIMIT)
    }
  }, [endReached])

  React.useEffect(() => {
    setSkip(0)
  }, [from])

  if (status === 'rejected') return <p>Oops! Something went wrong.</p>

  return (
    <div className="Home">
      {status === 'pending' ? (
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
          <Articles articles={articles} />
        </>
      )}
    </div>
  )
}

export default Home
