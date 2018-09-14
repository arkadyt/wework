import React from 'react'
import './Post.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    FaThumbsUp as IcoLike,
    FaComments as IcoComments,
    FaEllipsisV as IcoMore 
} from 'react-icons/fa'

import Field from '../Field/Field'
import placeholderImage from '../../images/avatar_placeholder.png'
import { likePost, deleteLike } from '../../state/actions/postsActions'

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
    authedUser,
    likePost,
    deleteLike,
    history,
    match,
    flat,
    nocomments
}) => {
    const likedByAuthedUser = !!likes.find(item => item.user === authedUser.id)
    const baseUrl = match.url || ''
    const dateFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }
    const flatStyle = {
        borderRadius: 'unset',
        boxShadow: 'unset',
        marginTop: 'unset',
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

    return <div className="Post-container" style={flat ? flatStyle : null}>
        <div className="header">
            <img src={avatar || placeholderImage} alt='' />
            <button className="Post-button-more"><IcoMore /></button>
            <p className="name">{name}</p>
            <p className="date">{new Date(date).toLocaleDateString('en-US', dateFormatOptions)}</p>
        </div>
        <p className="body">{text}</p>
        <div className="stats">
            <span>{likes.length} likes &nbsp;•&nbsp; {comments.length} comments</span>
        </div>
        <div className="buttons">
            <Field
                type="linkButton"
                inline
                style={{ color: likedByAuthedUser ? null : 'gray' }}
                onClick={() => {
                    likedByAuthedUser
                        ? deleteLike(_id)
                        : likePost(_id)
                }}>
                <span className="icon"><IcoLike /></span>
                &nbsp;Like
            </Field>
            {nocomments
                ? null
                : <Field
                    type="linkButton"
                    inline
                    style={{ color: 'gray', marginLeft: '1rem' }}
                    onClick={() => history.push(`${baseUrl}/view-comments/${_id}`)}>
                    <span className="icon"><IcoComments /></span>
                    &nbsp;Comment
            </Field>}
        </div>
    </div>
}

export default withRouter(connect(state => ({
    authedUser: state.auth.user
}), { likePost, deleteLike })(post))