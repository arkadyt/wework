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
        case types.POST_USERS_PROFILE:
            return {
                ...state,
                usersProfile: {
                    loading: false,
                    data: action.payload
                }
            }
        default:
            return state
    }
}