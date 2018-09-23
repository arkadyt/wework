import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state/store'
import Layout from './components/Layout'
import Navigation from './components/Navigation/Navigation'
import Greeter from './components/Greeter/Greeter'

class App extends React.Component {
  render() {
    return (
      <div className="App-container">
        <Greeter />
        <Provider store={store}>
          <Router>
            <React.Fragment>
              <Layout />
              <Navigation />
            </React.Fragment>
          </Router>
        </Provider>
      </div>
    )
  }
}

export default App
