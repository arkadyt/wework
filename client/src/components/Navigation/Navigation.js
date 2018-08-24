import React from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'

const navigation = () => {
    return <div className="Navigation-container">
        <nav>
            <Link to="/discover"><span>Discover</span></Link>
            <Link to="/login"><span>Log In</span></Link>
            <Link to="/signup"><span>Sign Up</span></Link>
            <Link to="/profile"><span>Profile</span></Link>
        </nav>
    </div>
}

export default navigation