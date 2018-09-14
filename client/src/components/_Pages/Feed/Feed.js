import React from 'react'
import './Feed.css'
import { connect } from 'react-redux'

import Post from '../../Post/Post'
import Reply from '../../Reply/Reply'
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
    addPost
}) => {
    let content = 'Please wait, loading...'

    if (posts.length === 0) {
        fetchPosts()
    } else {
        content = (
            <div className="Feed-container">
                <Reply onSubmit={(data, callback) => addPost(data, callback)} />
                <div className="feed">
                    {posts.map(item => (
                        <Post key={item._id} {...item} />)
                    )}
                </div>
            </div>
        )
    }

    return content
}

export default connect(state => ({
    posts: state.posts
}), { fetchPosts, addPost })(feed)