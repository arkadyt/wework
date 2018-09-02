/**
 * Our tasks for this component:
 * 1. Redirect to /login if protected route is accessed without a token
 * 2. Do not restrict any routes if user authenticated 
 * 
 * Workflow suggested by react-router:
 * Create PrivateRoute component that will somehow access the auth status,
 * and render Component or Redirect based on that.
 * 
 * Let's first build a simplified version of that.
 */

import React from 'react'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import './Layout.css'

function fakeAuth() {
    this.authed = false
}

fakeAuth.prototype.logout = function (history) {
    this.authed = false
    history.push('/login')
}

fakeAuth.prototype.login = function (history) {
    this.authed = true
    history.push('/protected')
}

const Auth = new fakeAuth();

class Login extends React.Component {
    render() {
        const { history } = this.props

        return <React.Fragment>
            {!Auth.authed
                ? <h3>LOGIN PLEASE:</h3>
                : <h3>WELCOME!</h3>}
            {!Auth.authed
                ? <button onClick={() => Auth.login(history)}>Log In</button>
                : <button onClick={() => Auth.logout(history)}>Sign out</button>}
        </React.Fragment>
    }
}


const Public = () => <h3>PUBLIC ROUTE! CHECK OUT OUR HIPPIE MERCH!</h3>
const Protected = () => <h3>PROTECTED! THIS IS AREA 50!</h3>

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props =>
            Auth.authed
                ? <Component {...props} />
                : <Redirect to='/login' />} />
    )
}

function Layout() {
    return (
        <div className="Layout-container">
            <ul>
                <li><Link to='/login'>Log In</Link></li>
                <li><Link to='/public'>Go to public</Link></li>
                <li><Link to='/protected'>Go to protected</Link></li>
            </ul>
            <br /><hr /><br /><hr /><br />
            <Route path='/login' component={Login} />
            <Route path='/public' component={Public} />
            <PrivateRoute path='/protected' component={Protected} />
        </div>
    )
}

export default withRouter(Layout)