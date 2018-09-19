import * as types from '../actions/types'

/**
 * NOTE: Wiping out entire errors object is allright!
 * Because it's sole purpose is to only hold errors that 
 * may be spawned by the page that user CURRENTLY interacts with.  
 */
const initialState = {
    formErrors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.POST_OLDER_POSTS:
            if (action.withReset) {
                if (action.payload.length >= 10) {
                    return initialState
                }
                
                return {
                    ...state,
                    endOfFeed: "You've reached the end of your feed!"
                }
            } else {
                return state
            }
        case types.POST_USERS_PROFILE:
            return initialState
        case types.POST_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            }
        case types.POST_ERRORS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}