import React from 'react'
import Feed from './_Pages/Feed/Feed'
import Profile from './_Pages/Profile/Profile'
import Discover from './_Pages/Discover/Discover'
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
                <Route path='/profile' component={Profile} />
                <PrivateRoute path='/discover' component={Discover} />
                <PrivateRoute path='/feed' component={Feed} />
            </Switch>
        </div>
    )
}

export default Layout