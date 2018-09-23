import React, { Component, Fragment } from 'react'
import './Feed.css'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { compose } from 'recompose'

import Post from '../../Post/Post'
import Reply from '../../Reply/Reply'
import CommentsView from '../../CommentsView/CommentsView'
import { fetchPosts, addPost } from '../../../state/actions/postsActions'
import { withEither, withAdded } from '../../../hocs/conditionalRendering'
import FBSpinner from '../../FBSpinner/FBSpinner'
import QuickStats from '../../QuickStats/QuickStats'
import Discover from '../../Discover/Discover'

const FeedContent = ({
    posts,
    baseUrl
}) => {
    return (
        <Fragment>
            <div className="Feed-body">
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

const NoContent = () => (
        <p className="Feed-message" style={{ marginBottom: 0 }}>
            We've got no posts for you yet!
        </p>
)
const EndOfFeedMessage = ({ endOfFeed }) => (
    <p className="Feed-message">
        {endOfFeed}
    </p>
)

const isEmptyFn = ({ endOfFeed, posts }) => posts.length === 0 && !!endOfFeed
const isLoadingFn = ({ endOfFeed, posts, isLoading }) => isLoading || !endOfFeed && posts.length === 0
const isEndOfFeedFn = ({ endOfFeed, isLoading }) => !!endOfFeed && !isLoading

const withCondRendering = compose(
    withEither(isEmptyFn, NoContent),
    withAdded(isLoadingFn, FBSpinner),
    withAdded(isEndOfFeedFn, EndOfFeedMessage)
)
const FeedContentWithCondRendering = withCondRendering(FeedContent)

class Feed extends Component {
    state = {
        loadMore: false,
        isLoading: false
    }

    isBottom = el => el.getBoundingClientRect().bottom <= window.innerHeight

    onScroll = () => {
        const { errors: { endOfFeed } } = this.props

        if (endOfFeed) return

        if (!this.state.isLoading) {
            if (this.isBottom(document.getElementById('Feed-mid-column'))) {
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
        fetchPosts(false)
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll)
    }

    render() {
        const {
            // endOfFeed is conditionally updated in the state/reducers/errReducer.js
            errors: { endOfFeed },
            posts,
            addPost,
            match
        } = this.props

        const baseUrl = match.url || ''

        return (
            <div className="Feed-container">
                <div className="Feed-lft-column">
                    <QuickStats />
                </div>
                <div id="Feed-mid-column" className="Feed-mid-column">
                    <Reply onSubmit={(data, callback) => addPost(data, callback)} />
                    <FeedContentWithCondRendering
                        isLoading={this.state.isLoading}
                        endOfFeed={endOfFeed}
                        posts={posts}
                        baseUrl={baseUrl} />
                </div>
                <div className="Feed-rgt-column">
                    <Discover />
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    posts: state.posts,
    errors: state.err
}), { fetchPosts, addPost })(Feed)