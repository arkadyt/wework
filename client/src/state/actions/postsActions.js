import axios from 'axios'
import * as types from './types'

export const addPost = (post, callback) => dispatch => {
    axios.post('/api/posts', post)
        .then(res => {
            dispatch({ type: types.POST_NEW_POSTS, payload: [res.data] })
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
 * Fetch posts starting from the oldest loaded one.
 * 10 posts would be sent out, including only those that belong to
 * the user and to followed users.
 * Posts are stored in the 'posts' object of the redux store.
 * 
 * @param oldestPostDate Date on the oldest fetched post.
 * If it's a first fetch, use [`new Date().toISOString()`]
 * to request the freshest batch.
 */
export const fetchPosts = (oldestPostDate, successCallback, errCallback) => dispatch => {
    axios.post('/api/posts/feed', { oldestPostDate })
        .then(res => {
            dispatch({ type: types.POST_NEW_POSTS, payload: res.data })
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