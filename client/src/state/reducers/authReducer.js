import * as types from '../actions/types'

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.TEST_DISPATCH:
            return {}
        case types.LOGIN_USER:
            return {
                ...state,
                user: action['payload']
            }
        default:
            return state
    }
}
