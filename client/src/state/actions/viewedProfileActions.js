import axios from 'axios'
import * as types from './types'

export const fetchAProfile = (userId, callback) => dispatch => {
    axios.get(`/api/profile/user/${userId}`)
        .then(res => {
            dispatch({ type: types.POST_VIEWED_PROFILE, payload: res.data })
            if (callback) callback()
        })
        .catch(err => console.log(err))
}