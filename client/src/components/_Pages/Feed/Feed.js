import React from 'react'
import './Feed.css'
import mockPosts from '../../../mocks/posts'
import Post from '../../Post/Post'
import Reply from '../../Reply/Reply'

const feed = () => {
    const myCallback = (values) => {
        console.log(values)
    }

    return <div className="Feed-container">
        <Reply callback={myCallback} />
        <div className="feed">
            {mockPosts.map(item => <Post {...item} />)}
        </div>
    </div>
}

export default feed