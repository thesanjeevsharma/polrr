import React from 'react'

export const useScrollListener = () => {
  const [endReached, setEndReached] = React.useState(false)

  const windowHeight =
    'innerHeight' in window
      ? window.innerHeight
      : document.documentElement.offsetHeight
  const body = document.body
  const html = document.documentElement

  const handleScroll = () => {
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= docHeight) {
      setEndReached(true)
    } else {
      setEndReached(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return endReached
}
