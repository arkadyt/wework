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