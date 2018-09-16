import * as types from '../actions/types'

const initialState = null

export default (state = initialState, action) => {
    switch (action.type) {
        case types.POST_VIEWED_PROFILE:
            return action.payload
        default:
            return state
    }
}