import React, { Component } from 'react'
import './CommentsView.css'
import { connect } from 'react-redux'

import Post from '../Post/Post'
import Reply from '../Reply/Reply'
import Overlay from '../Overlay/Overlay'
import { addComment } from '../../state/actions/postsActions'

const dateFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
}

const CommentNode = ({
    text,
    date,
    user: {
        name
    }
}) => (
        <div className="CommentsView-CommentNode-container">
            <p><b>{name}</b> said at {new Date(date)
                .toLocaleDateString('en-US', dateFormatOptions)}:</p>
            <p className="CommentsView-CommentNode-container-Node-body">{text}</p>
        </div>
    )

const commentsView = ({
    post,
    post: {
        _id,
        comments,
    },
    history,
    addComment
}) => {
    const handleDismiss = () => {
        history.goBack()
    }

    return (
        <Overlay onBackdropClick={() => handleDismiss()}>
            <div className="CommentsView-container">
                <div className="CommentsView-content">
                    <Post {...post} flat nocomments />
                    <Reply
                        rows="3"
                        flat
                        onSubmit={(data, callback) => addComment(_id, data, callback)} />
                    <div className="CommentsView-comments">
                        <h2>Comments:</h2><br />
                        {comments.length > 0
                            ? comments.map(item => <CommentNode {...item} />)
                            : <p>Be the first one to leave a comment!</p>}
                    </div>
                </div>
            </div>
        </Overlay>
    )
}

export default connect(null, { addComment })(commentsView)