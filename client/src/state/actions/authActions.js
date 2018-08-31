import * as types from './types'
import axios from 'axios'

export const loginUser = credentials => dispatch => {
    axios.post('/api/users/login', credentials)
        .then(res => {
            dispatch({ type: types.LOGIN_USER, payload: res.data.token })
        })
        .catch(err => {
            dispatch({ type: types.POST_ERRORS, payload: err.response.data })
        })
}

export const testDispatch = info => dispatch => {
    dispatch({ type: types.TEST_DISPATCH })
}