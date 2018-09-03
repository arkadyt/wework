import * as types from '../actions/types'

const initialState = {
    usersProfile: {
        loading: false,
        data: null
    },
    profiles: {
        loading: false,
        data: null
    },
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_USERS_PROFILE:
            return {
                ...state,
                usersProfile: {
                    ...state.usersProfile,
                    loading: true
                }
            }
        case types.POST_USERS_PROFILE:
            return {
                ...state,
                usersProfile: {
                    loading: false,
                    data: action.payload
                }
            }
        case types.FETCH_PROFILES:
            return state
        default:
            return state
    }
}