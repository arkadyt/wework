import React, { Component } from 'react'
import './CommentsView.scss'
import { connect } from 'react-redux'
import { func, object } from 'prop-types'

import Post from '../Post/Post'
import Reply from '../Reply/Reply'
import Overlay from '../Overlay/Overlay'
import { addComment } from '../../state/actions/postsActions'
import CommentNode from '../CommentNode/CommentNode'
import { postType } from '../../types/index'

/**
 * Component's contract
 *
 * What does my component render?
 * - Post component with flat & nocomments modflags,
 * - Reply component
 * - Array of CommentNodes
 * - All of the above is rendered in Overlay.
 *
 * Ok, but what does it render differently in different circumstances? (Props)
 * > Sure, look:
 * - If there is no post data upon the update, comment navigates back and returns false at shldCompUpd()
 * - If there is post data, component proceedes with the regular render
 * - If there are no post.comments component renders message instead of comments (lol).
 * - If there are post.comments, component maps the array to CommentNodes
 *
 * What about functions passed as props?
 * - addComent() is expected to be called upon the submisson 
 * - and is expected to be called with correct arguments: postId, commentBody, serviceCallback
 *
 * Interaction!
 * - No interactable parts.
 *
 * State?
 * - No
 *
 * List of constraints:
 * - If there is no post data upon the update, comment navigates back and returns false at shldCompUpd()
 * - If there is post data, component proceedes with the regular render
 * - If there are no post.comments component renders message instead of comments (lol).
 * - If there are post.comments, component maps the array to CommentNodes
 * - addComent() is expected to be called upon the submisson 
 * - and is expected to be called with correct arguments: postId, commentBody, serviceCallback
 */

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

CommentsView.propTypes = {
  post: postType,
  addComment: func.isRequired,
  history: object.isRequired
}

export const _UnconnectedCommentsView = CommentsView
export default connect(null, { addComment })(CommentsView)
