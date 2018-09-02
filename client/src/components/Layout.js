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
import { connect } from 'react-redux'
import { loginUser, logoutUser } from '../state/actions/authActions'
import './Layout.css'


const Login = connect(
    state => ({ auth: state.auth }),
    { loginUser, logoutUser }
)(props => {
    const { history, auth, loginUser, logoutUser } = props

    return <React.Fragment>
        {!auth.isAuthenticated
            ? <h3>LOGIN PLEASE:</h3>
            : <h3>WELCOME!</h3>}
        {!auth.isAuthenticated
            ? <button onClick={() => loginUser()}>Log In</button>
            : <button onClick={() => logoutUser()}>Sign out</button>}
    </React.Fragment>
})


const Public = () => <h3>PUBLIC ROUTE! CHECK OUT OUR HIPPIE MERCH!</h3>
const Protected = () => <h3>PROTECTED! THIS IS AREA 50!</h3>

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
    return <Route {...rest} render={props => {
        return authed
            ? <Component {...props} />
            : <Redirect to='/login' />
    }} />
}


// Connecting component to redux seems to fuck everything up.
// Having a simple PrivateRoute dependant on prop input doesn't matter
// It's when the PrivateRoute is connected to the redux things stop working

// Ok, I think I figured this out, you need to wrap connect()() with withRouter
// to use <Route /> inside. Going to do more tests, shit's crazy.
// Redux and react-router have a complicated relationship...

class Layout extends React.Component {
    // console.log('Layout props:', props)
    // let authed = props.auth.isAuthenticated
    // console.log(authed, typeof authed, authed === true, authed === false)
    render() {

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
                <Route path='/protected' component={Protected} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps)(Layout))