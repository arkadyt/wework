import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state/store'
import Layout from './components/Layout'
import Navigation from './components/Navigation/Navigation'

class App extends React.Component {
  render() {
    return <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navigation />
          <Layout />
        </React.Fragment>
      </Router>
    </Provider>
  }
}

export default App
