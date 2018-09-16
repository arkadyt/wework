import * as types from '../actions/types'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const initialState = {
    isAuthenticated: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_USER:
            localStorage.setItem('jwt', action.payload.token)
            axios.defaults.headers.common['Authorization'] = action.payload.token
            return {
                isAuthenticated: true,
                ...jwtDecode(action.payload.token)
            }
        case types.LOGOUT_USER:
            localStorage.removeItem('jwt')
            delete axios.defaults.headers.common['Authorization']
            return initialState
        default:
            return state
    }
}

