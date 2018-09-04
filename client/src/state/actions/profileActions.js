import axios from 'axios'
import * as types from '../actions/types'

/** 
 * Fetch current user's profile 
 */
export const fetchUsersProfile = callback => dispatch => {
    dispatch({ type: types.FETCH_USERS_PROFILE })
    axios.get(`/api/profile`)
        .then(res => {
            dispatch({ type: types.POST_USERS_PROFILE, payload: res.data })
            if (callback) callback()
        })
        .catch(err => {
            // dispatch({ type: types.POST_USERS_PROFILE, payload: null })
            dispatch({ type: types.POST_ERRORS, payload: err.response.data })
        })
}

// fetch_profiles
export function fetchProfiles(userIds) {

}