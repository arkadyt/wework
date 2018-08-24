import React from 'react'
import './DiscoverPage.css'
import mockProfileObject from '../../mocks/profile'
import ava_placeholder from '../../images/avatar_placeholder.png'
import { Link } from 'react-router-dom'

const discoverPage = () => {
    let profiles = new Array(10).fill(mockProfileObject, 0, 10)

    return <div className="DiscoverPage-container">
        <input type="text" placeholder="Search people by name, skill, posts..." className="search" />
        <div className="content">
            {profiles.map(({ image, user, title, status, location, company, handle }, idx) => {
                return <div className="node" key={`discover-node-${idx}`}>
                    <img src={image || ava_placeholder} alt='' />
                    <div className="text">
                        <p>{user.name}</p>
                        <p>{title} at {company}</p>
                        <p>{status}, {location}</p>
                    </div>
                    <Link to='/profile'><span>View Profile</span></Link>
                </div>
            })}
        </div>
    </div>
}

export default discoverPage