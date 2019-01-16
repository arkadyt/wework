import React from 'react'
import { NavLink } from 'react-router-dom'

const protectedLinks = ({ 
  isAuthenticated 
}) => (
  isAuthenticated 
    ? <React.Fragment>
      <NavLink to="/feed"><span>Feed</span></NavLink>
    </React.Fragment> : null
)

export default protectedLinks
