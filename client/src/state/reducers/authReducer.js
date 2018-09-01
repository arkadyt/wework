import * as types from '../actions/types'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.TEST_DISPATCH:
            return {}
        case types.LOGIN_USER:
            localStorage.setItem('jwt', action.payload.token)
            axios.defaults.headers.common['Authorization'] = action.payload.token
            return {
                isAuthenticated: true,
                user: jwtDecode(action.payload.token)
            }
        case types.LOGOUT_USER:
            delete axios.defaults.headers.common['Authorization']
            return initialState
        default:
            return state
    }
}

