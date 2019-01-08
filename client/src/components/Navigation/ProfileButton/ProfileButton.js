import React from 'react'
import { Link } from 'react-router-dom'

const profileButton = ({
  isAuthenticated,
  toggleDropdown
}) => (
  isAuthenticated
    ? <button className="Navigation-button" onClick={toggleDropdown}>
        <span>Account</span>
      </button> 
    : <Link to="/login">
        <span>Log In</span>
      </Link>
)

export default profileButton
