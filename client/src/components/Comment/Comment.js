import React from 'react'
import './Comment.css'

const comment = ({ user, date, text }) => {
    return <div className="Comment-container">
        <p className="header">
            <span>{user.name} said:</span>
            <span>{date}</span>
        </p>
        <p className="body">{text}</p>
    </div>
}

export default comment