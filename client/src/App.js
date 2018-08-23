import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout'

class App extends React.Component {
  render() {
    return <Router>
      <Layout />
    </Router>
  }
}

export default App
