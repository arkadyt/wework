import React from 'react'
import Feed from './_Pages/Feed/Feed'
import Profile from './_Pages/Profile/Profile'
import Signup from './_Forms/Signup/Signup'
import Login from './_Forms/Login/Login'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import './Layout.css'

function Layout() {
    return (
        <div className="Layout-container">
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <PrivateRoute path='/profile/id/:userId' component={Profile} />
                <PrivateRoute path='/profile' component={Profile} />
                <PrivateRoute path='/feed' component={Feed} />
            </Switch>
        </div>
    )
}

export default Layout