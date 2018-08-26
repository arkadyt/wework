import React from 'react'
import Post from '../../Post/Post'
import Comment from '../../Comment/Comment'
import Reply from '../../Reply/Reply'
import { mockPost } from '../../../mocks/posts'
import './Comments.css'

const comments = () => {
    return <div className="Comments-container">
        <div className="content">
            <Post {...mockPost} />
            <Reply />
            {mockPost.comments.map(item => <Comment {...item} />)}
        </div>
    </div>
}

export default comments