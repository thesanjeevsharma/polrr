import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

import Logo from 'assets/svgs/logo.svg'
import { Icon } from 'components'

import './Header.scss'

const Header: React.FC = () => {
  const { pathname } = useLocation()
  const [theme, setTheme] = React.useState<string>('light')

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const handleThemeChange = React.useCallback(() => {
    const alternateTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(alternateTheme)
    localStorage.setItem('theme', alternateTheme)
  }, [theme])

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDarkMode) {
        handleThemeChange()
      }
    }
  }, [handleThemeChange])

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.style.setProperty(
        '--color-background',
        '#262a35'
      )
      document.documentElement.style.setProperty(
        '--color-background-card',
        '#171920'
      )
      document.documentElement.style.setProperty('--color-shadow', '#2A2F3B')
      document.documentElement.style.setProperty(
        '--color-shadow-spread',
        '#4c9a60'
      )
      document.documentElement.style.setProperty('--color-text', '#FFFFFF')
    } else {
      document.documentElement.style.setProperty(
        '--color-background',
        '#FFFFFF'
      )
      document.documentElement.style.setProperty(
        '--color-background-card',
        '#FFFFFF'
      )
      document.documentElement.style.setProperty('--color-shadow', '#eaeaea')
      document.documentElement.style.setProperty(
        '--color-shadow-spread',
        '#cacaca'
      )
      document.documentElement.style.setProperty('--color-text', '#262a34')
    }
  }, [theme])

  return (
    <div className="Header">
      <Link to="/">
        <img alt="polrr logo" className="Header__Logo" src={Logo} />
      </Link>
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
        <li
          className={clsx('Header__NavList-item')}
          onClick={handleThemeChange}
        >
          {theme === 'light' ? <Icon name="sun" /> : <Icon name="moon" />}
        </li>
      </ul>
    </div>
  )
}

export default Header
