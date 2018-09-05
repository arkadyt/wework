import * as types from '../actions/types'

/**
 * Problem:
 * Forget form errors when profile is successfully fetched.
 * Errors are handled by the separate reducer.
 * Dispatching two actions is not an option since it may create an infinite loop.
 *
 * Solution:
 * Multiple reducers listening to the same action!
 * errReducer wipes out it's errors once it detects POST_USERS_PROFILE.
 */

const initialState = {
    usersProfile: null,
    profiles: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.POST_USERS_PROFILE:
            return {
                ...state,
                usersProfile: action.payload
            }
        default:
            return state
    }
}