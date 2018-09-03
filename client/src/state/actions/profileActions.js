import axios from 'axios'
import * as types from '../actions/types'

/** 
 * Fetch current user's profile 
 */
export const fetchUsersProfile = (userId, callback) => dispatch => {
    dispatch({ type: types.FETCH_USERS_PROFILE })
    axios.get(`/api/profile`)
        .then(res => {
            dispatch({ type: types.POST_USERS_PROFILE, payload: res.data })
            if (callback) callback()
        })
}

// fetch_profiles
export function fetchProfiles(userIds) {

}