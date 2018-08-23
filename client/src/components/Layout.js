import React from 'react'
import LoginPage from './LoginPage/LoginPage'
import { Route } from 'react-router-dom'

export default () => {
    return <div>
        <Route path='/login' component={LoginPage} />
    </div>
}