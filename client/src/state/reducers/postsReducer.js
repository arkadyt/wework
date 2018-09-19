import * as types from '../actions/types'

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case types.POST_NEWER_POSTS:
            return [...action.payload, ...state]
        case types.POST_OLDER_POSTS:
            if (action.withReset) {
                return action.payload
            } else {
                return [...state, ...action.payload]
            }
        case types.UPDATE_POST:
            return state.map(item => {
                return item._id === action.payload._id
                    ? action.payload
                    : item
            })
        case types.DELETE_POST:
            return state.filter(item => item._id !== action.payload._id)
        default:
            return state
    }
}