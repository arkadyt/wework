import React from 'react'
import Post from '../../Post/Post'
import Comment from '../../Comment/Comment'
import Reply from '../../Reply/Reply'
import { mockPost } from '../../../mocks/posts'

const comments = () => {
    return <div className="Comments-container">
        <Post {...mockPost} />
        <Reply />
        {mockPost.comments.map(item => <Comment {...item} />)}
    </div>
}

export default comments