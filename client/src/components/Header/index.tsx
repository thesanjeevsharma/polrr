import React from 'react'
import { Link } from 'react-router-dom'

import Logo from 'assets/svgs/logo.svg'
import { Icon } from 'components'
import './Header.scss'

const Header: React.FC = () => {
  return (
    <div className="Header">
      <h2 className="Header__Logo">
        <Link to="/">
          <img alt="polrr logo" src={Logo} />
        </Link>
      </h2>
      <ul className="Header__NavList">
        <li>
          <Link to="/saved">
            <Icon name="bookmark-multiple" />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
