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

export const fetchPosts = callback => dispatch => {
    axios.get('/api/posts')
        .then(res => {
            dispatch({ type: types.POST_NEW_POSTS, payload: res.data })
            if (callback) callback()
        })
        .catch(err => console.log(err))
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