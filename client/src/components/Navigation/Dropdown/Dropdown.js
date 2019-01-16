import React from 'react'
import { Link } from 'react-router-dom'

const dropdown = ({
  showDropdown,
  toggleDropdown,
  logoutUser,
  history
}) => (
  <React.Fragment>
    <ul 
      onClick={() => toggleDropdown(false)}
      className={["account-menu", showDropdown && "account-menu-open"].join(' ')}>
      <li>
        <Link to="/profile">
          <span>My Profile</span>
        </Link>
      </li>
      <li>
        <button 
          className="Navigation-menu-button"
          onClick={() => logoutUser(() => {
            history.push('/login')
          })}>
          <span>Logout</span>
        </button>
      </li>
    </ul>
    {showDropdown && 
        <div 
          className="backdrop" 
          onClick={() => toggleDropdown(false)} />}
  </React.Fragment>
)

export default dropdown
