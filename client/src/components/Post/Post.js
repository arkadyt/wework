import React from 'react'
import './Post.css'
import { connect } from 'react-redux'

import Field from '../Field/Field'
import placeholderImage from '../../images/avatar_placeholder.png'
import {
    FaThumbsUp as IcoLike,
    FaComments as IcoComments,
} from 'react-icons/fa'
import { likePost } from '../../state/actions/postsActions'

const post = ({
    _id,
    user: {
        name,
        avatar
    },
    text,
    comments,
    likes,
    date,
    likePost
}) => {
    const dateFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }

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
            <img src={avatar || placeholderImage} alt='' />
            <p className="name">{name}</p>
            <p className="date">{new Date(date).toLocaleDateString('en-US', dateFormatOptions)}</p>
        </div>
        <p className="body">{text}</p>
        <div className="stats">
            <span>{likes.length} likes • {comments.length} comments</span>
        </div>
        <div className="buttons">
            <Field type="linkButton" inline onClick={() => likePost(_id)}>
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

export default connect(null, { likePost })(post)