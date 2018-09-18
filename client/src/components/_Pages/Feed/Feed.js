import React, { Component, Fragment } from 'react'
import './Feed.css'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { compose } from 'recompose'

import Post from '../../Post/Post'
import Reply from '../../Reply/Reply'
import CommentsView from '../../CommentsView/CommentsView'
import { fetchPosts, addPost } from '../../../state/actions/postsActions'
import { withEither } from '../../../hocs/withEither'

const FeedContent = ({
    onAddPost: addPost,
    posts,
    baseUrl
}) => {
    console.log('FeedContent render. Props:', posts, baseUrl, addPost)
    return (
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

const isEmptyFn = props => props.isEmpty
const NoContent = ({ addPost }) => (
    <Fragment>
        <Reply onSubmit={(data, callback) => addPost(data, callback)} />
        <br />
        <h2>No posts were found. Create one now or subscribe to more people!</h2>
    </Fragment>
)

const isLoadingFn = props => props.isLoading
const LoadingSpinner = () => <h1>Please wait, loading...</h1>

const withCondRendering = compose(
    withEither(isLoadingFn, LoadingSpinner),
    withEither(isEmptyFn, NoContent)
)
const FeedContentWithCondRendering = withCondRendering(FeedContent)

class Feed extends Component {
    state = {
        isLoading: true
    }

    componentDidMount() {
        const { fetchPosts } = this.props
        fetchPosts(new Date().toISOString(), () => this.setState({ isLoading: false }))
    }

    render() {
        const {
            errors: { noContent },
            posts,
            addPost,
            match
        } = this.props

        const baseUrl = match.url || ''

        return (
            <div className="Feed-container">
                <FeedContentWithCondRendering
                    isLoading={this.state.isLoading}
                    isEmpty={!!noContent}
                    posts={posts}
                    onAddPost={addPost}
                    baseUrl={baseUrl} />
            </div>
        )
    }
}

export default connect(state => ({
    posts: state.posts,
    errors: state.err
}), { fetchPosts, addPost })(Feed)