import * as types from './types'
import axios from 'axios'

export const loginUser = (credentials, callback) => dispatch => {
    axios.post('/api/users/login', credentials)
        .then(res => {
            /* Small note: reducer function is called within the dispatch.
             * Rest assured that by the end of the dispatch() method execution
             * state is going to be updated.
             * https://github.com/reduxjs/redux/blob/56c94433703d327bd5b023d67ab50fd678b775ce/src/createStore.js#L186
             */
            dispatch({
                type: types.LOGIN_USER,
                payload: { token: res.data.token }
            })
            /* So redirecting user to the protected route in the callback would work, 
             * as the reducer would be already finished executing and isAuthenticated 
             * flag would be set to true.
             */ 
            if (callback) callback()
        })
        .catch(err => dispatch({
            type:
                types.POST_ERRORS, payload:
                err.response.data
        }))
}

export const logoutUser = callback => dispatch => {
    dispatch({ type: types.LOGOUT_USER })
    if (callback) callback()
}

export const registerUser = (formData, callback) => dispatch => {
    axios.post('/api/users/register', formData)
        .then(res => {
            dispatch({
                type: types.LOGIN_USER,
                payload: { token: res.data.token }
            })
            if (callback) callback()
        })
        .catch(err => dispatch({
            type: types.POST_ERRORS,
            payload: err.response.data
        }))
}

export const fetchSubscriptions = (userId, callback) => dispatch => {
    axios.get(`/api/users/${userId}/following`)
        .then(res => {
            dispatch({ type: types.POST_USERS_SUBSCRIPTIONS, payload: res.data })
            if (callback) callback()
        })
        .catch(err => console.log(err))
}

export const fetchFollowers = (userId, callback) => dispatch => {
    axios.get(`/api/users/${userId}/followers`)
        .then(res => {
            dispatch({ type: types.POST_USERS_FOLLOWERS, payload: res.data })
            if (callback) callback()
        })
        .catch(err => console.log(err))
}