import React, { Component } from 'react'
import './Feed.scss'
import { connect } from 'react-redux'
import Reply from '../../Reply/Reply'
import { fetchPosts, addPost } from '../../../state/actions/postsActions'
import FeedContent from './FeedContent/FeedContent'
import QuickStats from '../../QuickStats/QuickStats'
import Discover from '../../Discover/Discover'

const FeedContext = React.createContext()

class Feed extends Component {
  state = {
    loadMore: false,
    isLoading: false
  }

  isBottom(el) {
    return Math.floor(el.getBoundingClientRect().bottom) <= window.innerHeight
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

  boundOnScroll = this.onScroll.bind(this)

  triggerFeedLoad() {
    this.setState({ loadMore: true })
  }

  afterFetch() {
    this.setState({ isLoading: false })
  }

  componentDidUpdate() {
    if (this.state.loadMore) {
      this.setState({ loadMore: false, isLoading: true })

      const { posts, fetchPosts } = this.props

      fetchPosts(
        posts.length === 0 ? false : posts[posts.length - 1].date,
        this.afterFetch.bind(this),
        this.afterFetch.bind(this)
      )
    }
  }

  componentDidMount() {
    const { fetchPosts } = this.props
    document.addEventListener('scroll', this.boundOnScroll)

    window.scrollTo(0, 0)
    fetchPosts(false)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.boundOnScroll)
  }
  
  feedContext = {
    triggerFeedLoad: this.triggerFeedLoad.bind(this)
  }

  render() {
    const {
      // endOfFeed is conditionally updated in state/reducers/errReducer.js
      errors: { endOfFeed },
      posts,
      addPost,
      match
    } = this.props

    const baseUrl = match.url || ''

    return (
      <FeedContext.Provider value={this.feedContext}>
        <div className="Feed-container">
          <div className="Feed-lft-column">
            <QuickStats />
          </div>
          <div id="Feed-mid-column" className="Feed-mid-column">
            <Reply onSubmit={(data, callback) => addPost(data, callback)} />
            <FeedContent
              isLoading={this.state.isLoading}
              triggerFeedLoad={this.triggerFeedLoad.bind(this)}
              endOfFeed={endOfFeed}
              posts={posts}
              baseUrl={baseUrl} />
          </div>
          <div className="Feed-rgt-column">
            <Discover />
          </div>
        </div>
      </FeedContext.Provider>
    )
  }
}

export const mapStateToProps = state => ({
  posts: state.posts,
  errors: state.err
})

export { Feed, FeedContext }
export default connect(mapStateToProps, { fetchPosts, addPost })(Feed)
