import React, { Component } from 'react'
import './CommentsView.css'
import { connect } from 'react-redux'

import Post from '../Post/Post'
import Reply from '../Reply/Reply'
import Field from '../Field/Field'
import Overlay from '../Overlay/Overlay'
import { addComment, deleteComment } from '../../state/actions/postsActions'
import { fetchUsersStats } from '../../state/actions/userActions'

const dateFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
}

const CommentNode = connect(state => ({
    authedUserId: state.user.id
}), { deleteComment, fetchUsersStats })(({
    _id,
    text,
    date,
    user: {
        _id: authorId,
        name
    },
    postId,
    authedUserId,
    deleteComment,
    fetchUsersStats
}) => {
    const belongsToAuthedUser = authorId === authedUserId
    return (
        <div className="CommentsView-CommentNode-container">
            <p><b>{name}</b> said at {new Date(date)
                .toLocaleDateString('en-US', dateFormatOptions)}:</p>
            <p className="CommentsView-CommentNode-container-Node-body">{text}</p>
            {belongsToAuthedUser
                ? <div>
                    <Field
                        type="linkButton"
                        label="Delete"
                        inline
                        onClick={() =>
                            deleteComment(postId, _id, fetchUsersStats)
                        } />
                </div>
                : null}
        </div>
    )
})

class CommentsView extends Component {
    handleDismiss = () => {
        const { history } = this.props
        history.goBack()
    }

    shouldComponentUpdate(nextProps) {
        if (!nextProps.post) {
            this.handleDismiss()
            return false
        }
        return true
    }

    render() {
        const {
            post,
            post: {
                _id,
                comments
            },
            addComment
        } = this.props

        return (
            <Overlay onBackdropClick={() => this.handleDismiss()}>
                <div className="CommentsView-container">
                    <div className="CommentsView-content">
                        <Post {...post} flat nocomments />
                        <Reply
                            rows="3"
                            flat
                            onSubmit={(data, callback) => addComment(_id, data, callback)} />
                        <div className="CommentsView-comments">
                            <h2>Comments:</h2>
                            {comments.length > 0
                                ? comments.map(item => (
                                    <CommentNode
                                        key={item._id}
                                        postId={_id}
                                        {...item} />
                                ))
                                : <p>Be the first one to leave a comment!</p>}
                        </div>
                    </div>
                </div>
            </Overlay>
        )
    }
}

export default connect(null, { addComment })(CommentsView)