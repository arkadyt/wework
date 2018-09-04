import axios from 'axios'
import * as types from '../actions/types'

/** 
 * Fetch current user's profile 
 */
export const fetchUsersProfile = callback => dispatch => {
    dispatch({ type: types.LOADING_USERS_PROFILE })
    axios.get(`/api/profile`)
        .then(res => {
            dispatch({ type: types.POST_USERS_PROFILE, payload: res.data })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_ERRORS, payload: err.response.data })
            // reset loading status:
            dispatch({ type: types.FORGET_USERS_PROFILE })
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
        .catch(err => dispatch({ type: types.POST_ERRORS, payload: err.response.data }))
}

// fetch_profiles
export function fetchProfiles(userIds) {

}