import React, { Component } from 'react'
import './CommentsView.css'

import Post from '../Post/Post'
import Reply from '../Reply/Reply'
import Overlay from '../Overlay/Overlay'

const CommentNode = ({
    text
}) => <p>{text}</p>

const commentsView = ({
    post,
    history
}) => {
    const handleDismiss = () => {
        history.goBack()
    }

    return (
        <Overlay onBackdropClick={() => handleDismiss()}>
            <div className="CommentsView-container">
                <div className="content">
                    <Post {...mockPost} />
                    <Reply />
                    {post.comments.map(item => <CommentNode {...item} />)}
                </div>
            </div>
        </Overlay>
    )
}

export default commentsView