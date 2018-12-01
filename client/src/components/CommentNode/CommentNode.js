import React from 'react'
import Field from '../Field/Field'
import { connect } from 'react-redux'
import { deleteComment } from '../../state/actions/postsActions'
import { fetchUsersStats } from '../../state/actions/userActions'

const dateFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
}

const CommentNode = ({
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
}

export const _UnconnectedCommentNode = CommentNode
export default connect(state => ({
    authedUserId: state.user.id
}), { deleteComment, fetchUsersStats })(CommentNode)
