import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { oneOfType, node, func, shape, bool } from 'prop-types'

function privateRoute({ 
  component: Component, 
  authedUser: { 
    isAuthenticated 
  }, 
  ...rest 
}) {
  return (
    <Route {...rest} render={props =>
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/login' />} />
  )
}

privateRoute.propTypes = {
  component: oneOfType([node, func]).isRequired,
  authedUser: shape({
    isAuthenticated: bool.isRequired
  }).isRequired
}

export { privateRoute as _UnconnectedPrivateRoute }
export default withRouter(connect(state => ({
    authedUser: state.user
}))(privateRoute))
