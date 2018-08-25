import React from 'react'
import './Discover.css'
import mockProfileObject from '../../../mocks/profile'
import mockPosts from '../../../mocks/posts'
import ava_placeholder from '../../../images/avatar_placeholder.png'
import { Link } from 'react-router-dom'

const discover = () => {
    let profiles = new Array(10).fill(mockProfileObject, 0, 10)

    return <div className="Discover-container">
        <input type="text" placeholder="Search people or posts, by name, text, skills, etc..." className="search" />
        <div className="content">
            <h2>People</h2>
            <h2>Posts</h2>
            <div className="people">
                {profiles.map(({ image, user, title, status, location, company, handle }, idx) => {
                    return <div className="node" key={`discover-node-profile-${idx}`}>
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
            <div className="posts">
                {mockPosts.map(({ user, text, comments, likes }, idx) => {
                    return <div className="node" key={`discover-node-post-${idx}`}>
                        <p>{user.name} said:</p>
                        <p>{text}</p>
                        <p>
                            <a href="#">{likes.length} [LIKE!]</a>
                            <Link to='/comments'>{comments.length} comments</Link>
                        </p>
                    </div>
                })}
            </div>
        </div>
    </div>
}

export default discover