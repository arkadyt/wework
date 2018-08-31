import * as types from './types'
import axios from 'axios'

export const loginUser = credentials => dispatch => {
    axios.post('/api/users/login', credentials)
        .then(res => {
            dispatch({ type: types.LOGIN_USER, payload: res.data.token })
        })
        .catch(err => {
            alert('Failed :c', err.response.data) /* Dispatch SET_ERRORS action  */
        })
}

export const testDispatch = info => dispatch => {
    dispatch({ type: types.TEST_DISPATCH })
}