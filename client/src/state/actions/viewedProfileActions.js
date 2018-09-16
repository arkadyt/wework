import axios from 'axios'
import * as types from './types'

export const fetchAProfile = (userId, callback) => dispatch => {
    axios.get(`/api/profile/user/${userId}`)
        .then(res => {
            dispatch({ type: types.POST_VIEWED_PROFILE, payload: res.data })
            if (callback) callback()
        })
        .catch(err => {
            dispatch({ type: types.POST_ERRORS, payload: err.response.data })
        })
}

export const forgetNotFoundError = () => dispatch => {
    dispatch({ type: types.POST_ERRORS, payload: { noProfile: null } })
}