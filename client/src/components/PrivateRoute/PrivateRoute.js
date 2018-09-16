import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function PrivateRoute({ component: Component, authedUser: { isAuthenticated }, ...rest }) {
    return (
        <Route {...rest} render={props =>
            isAuthenticated
                ? <Component {...props} />
                : <Redirect to='/login' />} />
    )
}

const mapStateToProps = state => ({
    authedUser: state.user
})

export default withRouter(connect(mapStateToProps)(PrivateRoute))