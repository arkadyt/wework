import * as types from '../actions/types'

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case types.POST_NEW_POSTS:
            return [...action.payload, ...state]
        case types.POST_LIKE:
            return state.map(item => {
                return item._id === action.payload._id
                    ? action.payload
                    : item
            })
        default:
            return state
    }
}