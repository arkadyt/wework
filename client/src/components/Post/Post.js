import React from 'react'
import './Post.css'

import Field from '../Field/Field'
import placeholderImage from '../../images/avatar_placeholder.png'
import {
    FaThumbsUp as IcoLike,
    FaComments as IcoComments,
} from 'react-icons/fa'

const post = ({ user, text, comments, likes, date }) => {

    /**
     * Ava, Name
     * Title
     * When
     * 
     * Body
     * Media
     * 
     * Stats
     * Buttons
     */

    return <div className="Post-container">
        <div className="header">
            <img src={placeholderImage} alt='' />
            <p className="name">{user.name}</p>
            <p className="date">{date}</p>
        </div>
        <p className="body">{text}</p>
        <div className="stats">
            <span>{likes.length} likes • {comments.length} comments</span>
        </div>
        <div className="buttons">
            <Field type="linkButton" inline>
                <span className="icon"><IcoLike /></span>
                &nbsp;Like
            </Field>
            <Field type="linkButton" inline style={{ marginLeft: '1rem' }}>
                <span className="icon"><IcoComments /></span>
                &nbsp;Comment
            </Field>
        </div>
    </div>
}

export default post