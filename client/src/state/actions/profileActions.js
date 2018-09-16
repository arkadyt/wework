import axios from 'axios'
import * as types from '../actions/types'

/** 
 * Fetch current user's profile 
 */
export const fetchUsersProfile = callback => dispatch => {
    axios.get(`/api/profile`)
        .then(res => {
            dispatch({ type: types.POST_USERS_PROFILE, payload: res.data })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_ERRORS, payload: err.response.data })
        })
}

/**
 * Create or update current user's profile
 */
export const updateUsersProfile = (data, callback) => dispatch => {
    axios.post('/api/profile', data)
        .then(res => {
            dispatch({ type: types.POST_USERS_PROFILE, payload: res.data })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_FORM_ERRORS, payload: err.response.data })
        })
}

export const addEducation = (data, callback) => dispatch => {
    axios.post('/api/profile/education', data)
        .then(res => {
            dispatch({ type: types.POST_USERS_PROFILE, payload: res.data })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_FORM_ERRORS, payload: err.response.data })
        })
}

export const addExperience = (data, callback) => dispatch => {
    axios.post('/api/profile/experience', data)
        .then(res => {
            dispatch({ type: types.POST_USERS_PROFILE, payload: res.data })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_FORM_ERRORS, payload: err.response.data })
        })
}

export const deleteExperience = (nodeId, callback) => dispatch => {
    axios.delete(`/api/profile/experience/${nodeId}`)
        .then(res => {
            dispatch({ type: types.POST_USERS_PROFILE, payload: res.data })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_ERRORS, payload: err.response.data })
        })
}

export const deleteEducation = (nodeId, callback) => dispatch => {
    axios.delete(`/api/profile/education/${nodeId}`)
        .then(res => {
            dispatch({ type: types.POST_USERS_PROFILE, payload: res.data })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_ERRORS, payload: err.response.data })
        })
}

export const deleteProfile = callback => dispatch => {
    axios.delete('/api/profile')
        .then(() => {
            dispatch({ type: types.POST_USERS_PROFILE, payload: null })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_ERRORS, payload: err.response.data })
        })
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