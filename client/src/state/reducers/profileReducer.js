import * as types from '../actions/types'

const initialState = null

export default function (state = initialState, action) {
    switch (action.type) {
        case types.POST_USERS_PROFILE:
            return action.payload
        default:
            return state
    }
}