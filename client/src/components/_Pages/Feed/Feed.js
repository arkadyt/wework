import React, { Component, Fragment } from 'react'
import './Feed.css'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import Post from '../../Post/Post'
import Reply from '../../Reply/Reply'
import CommentsView from '../../CommentsView/CommentsView'
import { fetchPosts, addPost } from '../../../state/actions/postsActions'

const noContentPost = {
    text: 'Subscribe to more people to make your feed more interesting!',
    user: {
        name: 'WeWork'
    },
    date: ''
}

class Feed extends Component {
    state = {
        fetchMore: false,
        fetching: false
    }

    content = <h1>'Please wait, loading...'</h1>

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling)

                
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling)
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('Feed-container')
        if (this.isBottom(wrappedElement)) {
            // console.log('header bottom reached')
            // document.removeEventListener('scroll', this.trackScrolling)
            // flip 'fetchMore' only if not 'fetching'
            if (!this.state.fetching) {
                this.setState({ fetchMore: true })
            }
        }
    }

    defineContent = () => {
        const {
            posts,
            fetchPosts,
            addPost,
            match,
            errors: { noPosts }
        } = this.props
        const baseUrl = match.url || ''

        if (noPosts) {
            console.log('noPosts')
            this.content = (
                <Fragment>
                    <Reply onSubmit={(data, callback) => addPost(data, callback)} />
                    <br />
                    <h2>No posts were found. Create one now or subscribe to more people!</h2>
                </Fragment>
            )
        } else if (posts.length === 0) {
            console.log('posts.length === 0')
            fetchPosts(new Date().toISOString())
        } else if (this.state.fetchMore && !this.state.fetching) {
            console.log('fetchMore && !fetching')
            fetchPosts(posts[posts.length - 1].date)
            this.setState({
                fetchMore: false,
                fetching: true
            })
        } else {
            console.log('else')
            this.content = (
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
    }

    // componentWillMount() {
    //     this.defineContent()
    // }

    // componentWillUpdate() {
    //     this.defineContent()
    // }

    render() {
        return (
            <div id="Feed-container" className="Feed-container">
                {this.content}
            </div>
        )
    }
}

export default connect(state => ({
    posts: state.posts,
    errors: state.err
}), { fetchPosts, addPost })(Feed)