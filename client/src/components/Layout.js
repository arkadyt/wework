import React from 'react'
import LoginPage from './LoginPage/LoginPage'
import SignupPage from './SignupPage/SignupPage'
import { Route } from 'react-router-dom'

export default () => {
    return <div>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
    </div>
}