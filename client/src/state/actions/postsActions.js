import axios from 'axios'
import * as types from './types'

export const addPost = (post, callback) => dispatch => {
    axios.post('/api/posts', post)
        .then(res => {
            dispatch({ type: types.POST_NEW_POSTS, payload: res.data })
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
        .catch(err => {
            dispatch({ type: types.POST_ERRORS, payload: err.response.data })
        })
}