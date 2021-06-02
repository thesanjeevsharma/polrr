import React from 'react'

import './ImageFallback.scss'

interface ComponentProps {
  text: string
}

const ImageFallback: React.FC<ComponentProps> = ({ text }) => {
  return (
    <div className="ImageFallback">
      <h3 className="ImageFallback__Initials">{text}</h3>
    </div>
  )
}

export default ImageFallback
