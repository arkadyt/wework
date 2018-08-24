import React from 'react'
import LoginPage from './LoginPage/LoginPage'
import SignupPage from './SignupPage/SignupPage'
import ProfilePage from './ProfilePage/ProfilePage'
import { Route } from 'react-router-dom'
// import axios from 'axios'

export default () => {
    const mockProfileObject = {
        "skills": [
            "Assembler",
            "Go",
            "C#",
            "C++"
        ],
        "social": [],
        "date": "2018-08-23T20:25:12.263Z",
        "_id": "5b7b42ba57a5806b896e8f0d",
        "user": "5b75f023f1957052e52106f5",
        "__v": 0,
        "handle": "techguy_handle",
        "status": "Senior Developer",
        "company": "Itron",
        "experience": [
            {
                "current": false,
                "_id": "5b7ca6cf63353349cf03756c",
                "title": "SWE",
                "company": "Revature",
                "from": "2009-03-31T23:00:00.000Z",
                "to": "2025-08-01T01:13:50.111Z"
            }
        ],
        "education": [
            {
                "current": true,
                "_id": "5b7cab633345cc4c066c0540",
                "school": "AC Bootcamp",
                "degree": "Nano CS Degree",
                "from": "2015-08-02T18:33:20.000Z"
            }
        ],
        "bio": "My name is [techguyinfo]. I am a senior developer currently working at Microsoft. I specialize in AI and Cloud computing.",
        "githubusername": "arkadyt",
        "location": "Seattle, WA",
        "website": "techguy.info"
    }

    return <div>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/profile' render={() => <ProfilePage {...mockProfileObject} />} />
    </div>
}