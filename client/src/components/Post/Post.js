import React from 'react'
import './Post.css'

const post = ({ user, text, comments, likes, date }) => {
    return <div className="Post-container">
        <p className="header">
            <span>{user.name} said:</span>
            <span>{date}</span>
        </p>
        <p className="text">{text}</p>
        <p className="buttons">
            <span>{comments.length} comments</span>
            <a href="#">{likes.length} likes</a>
        </p>
    </div>
}

export default post