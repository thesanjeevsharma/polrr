import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Header, ReadingPanel } from 'components'
import { Home, Saved } from 'containers'
import { loadUser, logout } from 'store/features/userSlice'
import { useAppDispatch } from 'store/hooks'

import './styles.scss'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const token = localStorage.getItem('polrr-token')
    if (token) {
      dispatch(loadUser(token))
    } else {
      dispatch(logout())
    }
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Header />
        <ReadingPanel />
        <div className="App__Body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/saved" component={Saved} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
