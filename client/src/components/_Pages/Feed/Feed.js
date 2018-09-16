import React, { Fragment } from 'react'
import './Feed.css'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import Post from '../../Post/Post'
import Reply from '../../Reply/Reply'
import CommentsView from '../../CommentsView/CommentsView'
import { fetchPosts, addPost } from '../../../state/actions/postsActions'

const noContentPost = {
    text: 'Subscribe to more people to make your feed more interesting!',
    user: {
        name: 'WeWork'
    },
    date: ''
}

const feed = ({
    posts,
    fetchPosts,
    addPost,
    match,
    errors: { noPosts }
}) => {
    const baseUrl = match.url || ''

    let content = <h1>'Please wait, loading...'</h1>
    if (noPosts) {
        content = (
            <Fragment>
                <Reply onSubmit={(data, callback) => addPost(data, callback)} />
                <br />
                <h2>No posts were found. Create one now or subscribe to more people!</h2>
            </Fragment>
        )
    } else if (posts.length === 0) {
        fetchPosts()
    } else {
        content = (
            <Fragment>
                <Reply onSubmit={(data, callback) => addPost(data, callback)} />
                <div className="feed">
                    {posts.map(item => (
                        <Post key={item._id} {...item} />)
                    )}
                </div>
                <Route path={`${baseUrl}/view-comments/:postId`} render={props => (
                    <CommentsView {...props} post={posts.find(
                        item => item._id === props.match.params.postId
                    )} />
                )} />
            </Fragment>
        )
    }

    return (
        <div className="Feed-container">
            {content}
        </div>
    )
}

export default connect(state => ({
    posts: state.posts,
    errors: state.err
}), { fetchPosts, addPost })(feed)