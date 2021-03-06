import React from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

import { Icon } from 'components'
import { current } from 'store/features/newsSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import './ReadingPanel.scss'

const ReadingPanel = () => {
  const dispatch = useAppDispatch()
  const { currentlyReading } = useAppSelector((state) => state.news)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (currentlyReading) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [currentlyReading, setIsOpen])

  const handleClose = () => {
    dispatch(current(null))
  }

  return (
    <>
      {createPortal(
        <div className={clsx('ReadingPanel', isOpen && 'ReadingPanel--open')}>
          <div className="ReadingPanel__Header">
            <Icon name="close" onClick={handleClose} />
          </div>
          <iframe title={currentlyReading?.title} src={currentlyReading?.url} />
        </div>,
        document.getElementById('reading-panel-root')!
      )}
    </>
  )
}

export default ReadingPanel
