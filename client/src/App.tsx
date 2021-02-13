import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Header } from 'components'
import { Home, Saved } from 'containers'

import './styles.scss'

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Header />
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
