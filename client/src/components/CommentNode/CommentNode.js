import React from 'react'
import Field from '../Field/Field'
import { connect } from 'react-redux'
import { deleteComment } from '../../state/actions/postsActions'
import { fetchUsersStats } from '../../state/actions/userActions'
import './CommentNode.scss'
import { commentType } from '../../types/index'
import { func, string } from 'prop-types'

const dateFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
}

const CommentNode = ({
    comment,
    postId,
    authedUserId,
    deleteComment,
    fetchUsersStats
}) => {
    const {
        _id,
        text,
        date,
        user: {
            _id: authorId,
            name
        },
    } = comment
    const belongsToAuthedUser = authorId === authedUserId
    return (
        <div className="CommentNode-container">
            <p><b>{name}</b> said at {new Date(date)
                .toLocaleDateString('en-US', dateFormatOptions)}:</p>
            <p className="CommentNode-container-Node-body">{text}</p>
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

CommentNode.propTypes = {
  deleteComment: func.isRequired,
  fetchUsersStats: func.isRequired,
  comment: commentType.isRequired,
  postId: string.isRequired,
  authedUserId: string.isRequired
}

export const mapStateToProps = state => ({
    authedUserId: state.user.id
})

export const _UnconnectedCommentNode = CommentNode
export default connect(mapStateToProps, { deleteComment, fetchUsersStats })(CommentNode)
