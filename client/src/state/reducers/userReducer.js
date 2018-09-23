import * as types from '../actions/types'
import axios from 'axios'

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
                ...action.payload.decodedToken
            }
        case types.LOGOUT_USER:
            localStorage.removeItem('jwt')
            delete axios.defaults.headers.common['Authorization']
            return initialState
        case types.POST_USERS_SUBSCRIPTIONS:
            return {
                ...state,
                following: action.payload
            }
        case types.POST_USERS_FOLLOWERS:
            return {
                ...state,
                followers: action.payload
            }
        case types.POST_STATS:
            return {
                ...state,
                stats: action.payload
            }
        case types.POST_DISCOVER_CONTENT:
            return {
                ...state,
                discoverList: action.payload
            }
        default:
            return state
    }
}

