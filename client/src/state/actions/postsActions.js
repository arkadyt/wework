import axios from 'axios'
import * as types from './types'

export const addPost = (post, callback) => dispatch => {
    axios.post('/api/posts', post)
        .then(res => {
            dispatch({ type: types.POST_NEWER_POSTS, payload: [res.data] })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_FORM_ERRORS, payload: err.response.data })
        })
}

export const deletePost = (postId, callback) => dispatch => {
    axios.delete(`/api/posts/${postId}`)
        .then(res => {
            dispatch({ type: types.DELETE_POST, payload: res.data })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_ERRORS, payload: err.response.data })
        })
}

/**
 * Fetch posts starting from after the oldest loaded one.
 * 10 posts would be sent out, including only those that belong to
 * the user and to the followed users.
 * Posts are then stored in the 'posts' object of the redux store.
 * 
 * @param oldestPostDate Date on the oldest fetched post.
 * If it's a first fetch pass `false` to request the freshest batch.
 */
export const fetchPosts = (oldestPostDate, successCallback, errCallback) => dispatch => {
    const withReset = !oldestPostDate

    axios.post('/api/posts/feed', {
        oldestPostDate:
            withReset
                ? new Date().toISOString()
                : oldestPostDate
    })
        .then(res => { 
            dispatch({
                type: types.POST_OLDER_POSTS,
                payload: res.data,
                withReset
            })
            if (successCallback) successCallback()
        })
        .catch(err => {
            dispatch({ type: types.POST_ERRORS, payload: err.response.data })
            if (errCallback) errCallback()
        })
}

export const likePost = (postId, callback) => dispatch => {
    axios.post(`/api/posts/${postId}/like`)
        .then(res => {
            dispatch({ type: types.UPDATE_POST, payload: res.data })
            if (callback) callback()
        })
        .catch(err => console.log(err))
}

export const deleteLike = (postId, callback) => dispatch => {
    axios.delete(`/api/posts/${postId}/like`)
        .then(res => {
            dispatch({ type: types.UPDATE_POST, payload: res.data })
            if (callback) callback()
        })
        .catch(err => console.log(err))
}

export const addComment = (postId, data, callback) => dispatch => {
    axios.post(`/api/posts/${postId}/comment`, data)
        .then(res => {
            dispatch({ type: types.UPDATE_POST, payload: res.data })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_FORM_ERRORS, payload: err.response.data })
        })
}

export const deleteComment = (postId, commentId, callback) => dispatch => {
    axios.delete(`/api/posts/${postId}/comment/${commentId}`)
        .then(res => {
            dispatch({ type: types.UPDATE_POST, payload: res.data })
            if (callback) callback()
        })
        .catch(err => console.log(err))
}