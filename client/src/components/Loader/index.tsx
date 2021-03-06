import React from 'react'
import { Icon } from 'components'

import './Loader.scss'

const Loader = () => {
  return (
    <div className="Loader">
      <Icon className="Loader__icon" name="loading" />
    </div>
  )
}

export default Loader
