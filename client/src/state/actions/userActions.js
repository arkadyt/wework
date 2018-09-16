import * as types from './types'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export const loginUser = (credentials, callback) => dispatch => {
    axios.post('/api/users/login', credentials)
        .then(res => {
            /* Reducer function is executed within the dispatch, so that
             * by the end of the dispatch() state is updated 
             * and subscribers are notified.
             * https://github.com/reduxjs/redux/blob/56c94433703d327bd5b023d67ab50fd678b775ce/src/createStore.js#L186
             */
            const decodedToken = jwtDecode(res.data.token)
            dispatch({
                type: types.LOGIN_USER,
                payload: {
                    token: res.data.token,
                    decodedToken
                }
            })
            if (callback) callback(decodedToken.id)
        })
        .catch(err => dispatch({
            type:
                types.POST_FORM_ERRORS, payload:
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
            const decodedToken = jwtDecode(res.data.token)
            dispatch({
                type: types.LOGIN_USER,
                payload: {
                    token: res.data.token,
                    decodedToken
                }
            })
            if (callback) callback()
        })
        .catch(err => dispatch({
            type: types.POST_FORM_ERRORS,
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

export const followAPerson = (userId, callback) => dispatch => {
    axios.post(`/api/users/${userId}/follow`)
        .then(res => {
            dispatch({ type: types.POST_USERS_FOLLOWERS, payload: res.data })
            if (callback) callback()
        })
        .catch(err => console.log(err))
}