import React, { Component } from 'react'
import './Post.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    FaThumbsUp as IcoLike,
    FaComments as IcoComments,
    FaEllipsisV as IcoMore
} from 'react-icons/fa'

import Field from '../Field/Field'
import placeholderImage from '../../images/avatar_placeholder.png'
import { likePost, deleteLike, deletePost } from '../../state/actions/postsActions'
import {
    unfollowAPerson,
    fetchDiscoverContent,
    fetchUsersStats
} from '../../state/actions/userActions'

class Post extends Component {
    state = {
        showMenu: false
    }

    dismissMenu = e => {
        if (e.target.className !== "Post__button--menu")
            this.setState({ showMenu: false })
    }

    componentWillMount() {
        window.addEventListener('click', this.dismissMenu)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.dismissMenu)
    }

    render() {
        const {
            _id,
            user: {
                _id: authorId,
                name,
                avatar
            },
            text,
            comments,
            likes,
            date,
            authedUser,
            likePost,
            deleteLike,
            deletePost,
            unfollowAPerson,
            fetchDiscoverContent,
            fetchUsersStats,
            history,
            match,
            flat,
            nocomments
        } = this.props
        // likes.user field does not get populated and directly contains the _id
        const likedByAuthedUser = !!likes.find(item => item.user === authedUser.id)

        const belongsToAuthedUser = authorId === authedUser.id
        const baseUrl = match.url || ''
        const dateFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
        const flatStyle = {
            borderRadius: 'unset',
            boxShadow: 'unset',
            marginTop: 'unset',
        }

        return <div className="Post__container" style={flat ? flatStyle : null}>
            <div className={["Post__menu",
                this.state.showMenu
                    ? "Post__menu--shown"
                    : ""].join(' ')}>
                {belongsToAuthedUser
                    ? <button
                        className="Post__menu-item"
                        onClick={() => 
                            deletePost(_id, () => {
                                fetchUsersStats()
                            })}>
                        Delete</button>
                    : <button
                        className="Post__menu-item"
                        onClick={() =>
                            unfollowAPerson(authorId, () => {
                                fetchUsersStats()
                                fetchDiscoverContent(5)
                            })
                        }>
                        Unfollow user</button>}
            </div>
            <div className="Post__header">
                <img className="Post__avatar" src={avatar || placeholderImage} alt='' />
                <button
                    className="Post__button--menu"
                    onClick={() => this.setState(
                        prevState => ({ showMenu: !prevState.showMenu })
                    )}>
                    <IcoMore />
                </button>
                <div className="Post__name">
                    <Field
                        type="linkButton"
                        label={name}
                        inline
                        style={{ fontSize: '1.25rem' }}
                        onClick={() => history.push(
                            belongsToAuthedUser
                                ? '/profile'
                                : `/profile/id/${authorId}`
                        )} />
                </div>
                <p className="Post__date">{new Date(date).toLocaleDateString('en-US', dateFormatOptions)}</p>
            </div>
            <p className="Post__body">{text}</p>
            <div className="Post__stats">
                <span>{likes.length} likes &nbsp;•&nbsp; {comments.length} comments</span>
            </div>
            <div className="Post__buttons">
                <Field
                    type="linkButton"
                    inline
                    style={ likedByAuthedUser ? { color: 'cornflowerblue' } : null }
                    onClick={() => {
                        likedByAuthedUser
                            ? deleteLike(_id, fetchUsersStats)
                            : likePost(_id, fetchUsersStats)
                    }}>
                    <span className="Post__buttons-icon"><IcoLike /></span>
                    &nbsp;Like
            </Field>
                {nocomments
                    ? null
                    : <Field
                        type="linkButton"
                        inline
                        style={{ marginLeft: '1rem' }}
                        onClick={() => history.push(`${baseUrl}/view-comments/${_id}`)}>
                        <span className="Post__buttons-icon"><IcoComments /></span>
                        &nbsp;Comment
            </Field>}
            </div>
        </div>
    }
}

export const _UnconnectedPost = Post;
export default withRouter(connect(state => ({
    authedUser: state.user
}), {
        likePost,
        deleteLike,
        deletePost,
        unfollowAPerson,
        fetchDiscoverContent,
        fetchUsersStats
    })(Post))
