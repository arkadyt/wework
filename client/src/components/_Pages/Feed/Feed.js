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
import { withAdded } from '../../../hocs/withAdded'
import FBSpinner from '../../FBSpinner/FBSpinner'

const FeedContent = ({
    onAddPost: addPost,
    posts,
    baseUrl
}) => {
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

const withCondRendering = compose(
    withAdded(isLoadingFn, FBSpinner),
    withEither(isEmptyFn, NoContent)
)
const FeedContentWithCondRendering = withCondRendering(FeedContent)

class Feed extends Component {
    state = {
        loadMore: false,
        isLoading: true
    }

    isBottom = el => el.getBoundingClientRect().bottom <= window.innerHeight

    onScroll = ev => {
        const { errors: { endOfFeed } } = this.props

        if (endOfFeed) return

        if (!this.state.isLoading) {
            if (this.isBottom(document.getElementById('Feed-container'))) {
                this.setState({ loadMore: true })
            }
        }
    }

    componentDidUpdate() {
        if (this.state.loadMore) {
            this.setState({ loadMore: false, isLoading: true })

            const { posts, fetchPosts } = this.props

            const afterFetch = () => this.setState({ isLoading: false })
            fetchPosts(posts[posts.length - 1].date, afterFetch, afterFetch)
        }
    }

    componentDidMount() {
        const { fetchPosts } = this.props
        document.addEventListener('scroll', this.onScroll)

        window.scrollTo(0, 0)
        fetchPosts(false, () => this.setState({ isLoading: false }))
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll)
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
            <div id="Feed-container" className="Feed-container">
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