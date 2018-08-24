import React from 'react'
import LoginPage from './LoginPage/LoginPage'
import SignupPage from './SignupPage/SignupPage'
import ProfilePage from './ProfilePage/ProfilePage'
import DiscoverPage from './DiscoverPage/DiscoverPage'
import mockProfileObject from '../mocks/profile'
import { Route } from 'react-router-dom'
// import axios from 'axios'

export default () => {
    return <div>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/profile' render={() => <ProfilePage {...mockProfileObject} />} />
        <Route path='/discover' component={DiscoverPage} />
    </div>
}