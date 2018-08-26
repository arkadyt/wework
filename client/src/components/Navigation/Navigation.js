import React from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'

const navigation = () => {
    return <div className="Navigation-container">
        <nav>
            <Link to="/addExp"><span>AddExp</span></Link>
            <Link to="/addEdu"><span>AddEdu</span></Link>
            <Link to="/comments"><span>Comments</span></Link>
            <Link to="/feed"><span>Feed</span></Link>
            <Link to="/discover"><span>Discover</span></Link>
            <Link to="/profile"><span>Profile</span></Link>
            <Link to="/login"><span>Log In / Sign Up</span></Link>
        </nav>
    </div>
}

export default navigation