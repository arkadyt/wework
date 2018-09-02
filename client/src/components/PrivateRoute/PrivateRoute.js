import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function PrivateRoute({ component: Component, auth: { isAuthenticated }, ...rest }) {
    return (
        <Route {...rest} render={props =>
            isAuthenticated
                ? <Component {...props} />
                : <Redirect to='/login' />} />
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default withRouter(connect(mapStateToProps)(PrivateRoute))