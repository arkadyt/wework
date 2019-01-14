import React, { Component } from 'react'
import './Feed.scss'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Reply from '../../Reply/Reply'
import { fetchPosts, addPost } from '../../../state/actions/postsActions'
import { withEither, withAdded } from '../../../hocs/conditionalRendering'
import FBSpinner from '../../FBSpinner/FBSpinner'
import NoContent from './NoContent/NoContent'
import FeedContent from './FeedContent/FeedContent'
import EndOfFeedMessage from './EndOfFeedMessage/EndOfFeedMessage'
import QuickStats from '../../QuickStats/QuickStats'
import Discover from '../../Discover/Discover'

class Feed extends Component {
  state = {
    loadMore: false,
    isLoading: false
  }

  isEmptyFn({ endOfFeed, posts }) {
    return posts.length === 0 && !!endOfFeed
  }

  isLoadingFn({ endOfFeed, posts, isLoading }) {
    return isLoading || (!endOfFeed && posts.length === 0)
  }

  isEndOfFeedFn({ endOfFeed, isLoading }) {
    return !!endOfFeed && !isLoading
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight
  }

  onScroll() {
    const { errors: { endOfFeed } } = this.props

    if (endOfFeed) return

    if (!this.state.isLoading) {
      if (this.isBottom(document.getElementById('Feed-mid-column'))) {
        this.setState({ loadMore: true })
      }
    }
  }

  afterFetch() {
    this.setState({ isLoading: false })
  }

  componentDidUpdate() {
    if (this.state.loadMore) {
      this.setState({ loadMore: false, isLoading: true })

      const { posts, fetchPosts } = this.props

      fetchPosts(
        posts[posts.length - 1].date,
        this.afterFetch.bind(this),
        this.afterFetch.bind(this)
      )
    }
  }

  componentDidMount() {
    const { fetchPosts } = this.props
    document.addEventListener('scroll', this.onScroll.bind(this))

    window.scrollTo(0, 0)
    fetchPosts(false)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll.bind(this))
  }

  render() {
    const {
      // endOfFeed is conditionally updated in state/reducers/errReducer.js
      errors: { endOfFeed },
      posts,
      addPost,
      match
    } = this.props

    const withCondRendering = compose(
      withEither(this.isEmptyFn, NoContent),
      withAdded(this.isLoadingFn, FBSpinner),
      withAdded(this.isEndOfFeedFn, EndOfFeedMessage)
    )

    const FeedContentWithCondRendering = withCondRendering(FeedContent)

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

export const mapStateToProps = state => ({
  posts: state.posts,
  errors: state.err
})

export { Feed }
export default connect(mapStateToProps, { fetchPosts, addPost })(Feed)
