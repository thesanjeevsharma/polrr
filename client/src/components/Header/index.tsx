import React from 'react'
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'
import { Link, useLocation } from 'react-router-dom'
import { AnyAction } from 'redux'
import clsx from 'clsx'

import Logo from 'assets/svgs/logo.svg'
import { Button, Icon } from 'components'
import { loginUser, logout } from 'store/features/userSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import './Header.scss'

const Header: React.FC = () => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { isLoggedIn, user } = useAppSelector((state) => state.user)
  const [theme, setTheme] = React.useState<string>('light')

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const responseGoogle = (res: any) => {
    console.log(res)
    if (res.profileObj) {
      const userDetails = {
        email: res.profileObj.email,
        firstName: res.profileObj.givenName,
        googleId: res.profileObj.googleId,
        lastName: res.profileObj.familyName,
        profileImage: res.profileObj.imageUrl,
      }
      dispatch(loginUser(userDetails))
    }
  }

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
      <WebNav
        dispatch={dispatch}
        handleThemeChange={handleThemeChange}
        isLoggedIn={isLoggedIn}
        pathname={pathname}
        responseGoogle={responseGoogle}
        theme={theme}
      />
      <MobileNav
        dispatch={dispatch}
        handleThemeChange={handleThemeChange}
        isLoggedIn={isLoggedIn}
        pathname={pathname}
        responseGoogle={responseGoogle}
        theme={theme}
      />
    </div>
  )
}

export default Header

interface NavProps {
  dispatch: (x: AnyAction) => void
  handleThemeChange(): void
  isLoggedIn: boolean
  pathname: string
  responseGoogle: (x: GoogleLoginResponse | GoogleLoginResponseOffline) => void
  theme: string
}

const WebNav: React.FC<NavProps> = ({
  dispatch,
  handleThemeChange,
  isLoggedIn,
  pathname,
  responseGoogle,
  theme,
}) => {
  return (
    <ul className="Header__NavList">
      <li
        className={clsx(
          'Header__NavList-item',
          pathname === '/' && 'Header__NavList-item--active'
        )}
      >
        <Link to="/">Home</Link>
      </li>
      {isLoggedIn ? (
        <>
          <li
            className={clsx(
              'Header__NavList-item',
              pathname === '/saved' && 'Header__NavList-item--active'
            )}
          >
            <Link to="/saved">Saved</Link>
          </li>
          <Button
            className={clsx('Header__NavList-item')}
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </>
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          render={(renderProps: any) => (
            <Button
              className={clsx('Header__NavList-item')}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login
            </Button>
          )}
        />
      )}
      <li className={clsx('Header__NavList-item')} onClick={handleThemeChange}>
        {theme === 'light' ? <Icon name="sun" /> : <Icon name="moon" />}
      </li>
    </ul>
  )
}

const MobileNav: React.FC<NavProps> = ({
  dispatch,
  handleThemeChange,
  isLoggedIn,
  pathname,
  responseGoogle,
  theme,
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsMobileNavOpen(false)
  }, [pathname])

  return (
    <div className="Header__MobileNav">
      <Icon name="menu" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} />
      <ul
        className={clsx(
          'Header__MobileNavList',
          isMobileNavOpen && 'Header__MobileNavList--open'
        )}
      >
        <li className={clsx('Header__MobileNavList-item')}>
          {theme === 'light' ? (
            <Icon
              className="Header__MobileNavList-item-icon"
              name="sun"
              onClick={() => {
                setIsMobileNavOpen(false)
                handleThemeChange()
              }}
            />
          ) : (
            <Icon
              className="Header__MobileNavList-item-icon"
              name="moon"
              onClick={() => {
                setIsMobileNavOpen(false)
                handleThemeChange()
              }}
            />
          )}
          <Icon
            className="Header__MobileNavList-item-icon"
            name="close"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          />
        </li>
        <li
          className={clsx(
            'Header__MobileNavList-item',
            pathname === '/' && 'Header__MobileNavList-item--active'
          )}
        >
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li
              className={clsx(
                'Header__MobileNavList-item',
                pathname === '/saved' && 'Header__MobileNavList-item--active'
              )}
            >
              <Link to="/saved">Saved</Link>
            </li>
            <Button
              className={clsx('Header__MobileNavList-item')}
              onClick={() => {
                setIsMobileNavOpen(false)
                dispatch(logout())
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            onScriptLoadFailure={(res) => console.log(res)}
            cookiePolicy={'single_host_origin'}
            render={(renderProps: any) => (
              <Button
                className={clsx('Header__MobileNavList-item')}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login
              </Button>
            )}
          />
        )}
      </ul>
    </div>
  )
}
