import React from 'react'
import './Feed.css'
import { connect } from 'react-redux'

import Post from '../../Post/Post'
import Reply from '../../Reply/Reply'
import { fetchPosts } from '../../../state/actions/postsActions'

const noContentPost = {
    text: 'Subscribe to more people to make your feed more interesting!',
    user: {
        name: 'WeWork'
    },
    date: ''
}

// mainly 3/4ths of job is Java related, JavaScript goes for the frontend.
// 60k remote?
// should I look for more?

const feed = ({
    posts,
    fetchPosts
}) => {
    let content = 'Please wait, loading...'

    console.log('posts', posts)

    if (!posts) {
        fetchPosts()
    } else if (posts) {
        content = (
            <div className="Feed-container">
                <Reply />
                <div className="feed">
                    {Object.keys(posts).map(key => (
                        <Post key={posts[key]['_id']} {...posts[key]} />)
                    )}
                </div>
            </div>
        )
    }

    return content
}

export default connect(state => ({
    posts: state.posts
}), { fetchPosts })(feed)