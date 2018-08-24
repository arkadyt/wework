import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout'
import Navigation from './components/Navigation/Navigation'

class App extends React.Component {
  render() {
    return <Router>
      <React.Fragment>
        <Navigation />
        <Layout />
      </React.Fragment>
    </Router>
  }
}

export default App
