import React from 'react'
import LoginPage from './_Forms/Login/Login'
import SignupPage from './_Forms/Signup/Signup'
import Profile from './_Pages/Profile/Profile'
import Discover from './_Pages/Discover/Discover'
import Feed from './_Pages/Feed/Feed'
import AddExp from './_Forms/AddExp/AddExp'
import AddEdu from './_Forms/AddEdu/AddEdu'
import Comments from './_Pages/Comments/Comments'
import mockProfileObject from '../mocks/profile'
import { Route } from 'react-router-dom'
// import axios from 'axios'

export default () => {
    return <div>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/profile' render={() => <Profile {...mockProfileObject} />} />
        <Route path='/discover' component={Discover} />
        <Route path='/feed' component={Feed} />
        <Route path='/addExp' component={AddExp} />
        <Route path='/addEdu' component={AddEdu} />
        <Route path='/comments' component={Comments} />
    </div>
}