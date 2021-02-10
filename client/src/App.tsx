import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home } from 'containers'
import { Header } from 'components'

import './styles.scss'

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
