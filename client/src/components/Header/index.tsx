import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import Logo from 'assets/svgs/logo.svg'
import { Icon } from 'components'
import './Header.scss'
import clsx from 'clsx'

const Header: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <div className="Header">
      <h2 className="Header__Logo">
        <Link to="/">
          <img alt="polrr logo" src={Logo} />
        </Link>
      </h2>
      <ul className="Header__NavList">
        <li
          className={clsx(
            'Header__NavList-item',
            pathname === '/' && 'Header__NavList-item--active'
          )}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={clsx(
            'Header__NavList-item',
            pathname === '/saved' && 'Header__NavList-item--active'
          )}
        >
          <Link to="/saved">Saved</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
