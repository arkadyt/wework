import * as types from '../actions/types'

const initialState = {
    formErrors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.POST_OLDER_POSTS:
            if (action.withReset) {
                if (action.payload.length >= 10) {
                    // if a batch of at least 10 posts comes in
                    // then the end of the feed is not yet reached.
                    //
                    // but what if number of available posts in even?
                    // next fetch will run the opposite clause! 
                    return {
                        ...state,
                        endOfFeed: null
                    }
                }
                
                return {
                    ...state,
                    endOfFeed: "You've reached the end of your feed!"
                }
            } else {
                return state
            }
        case types.POST_USERS_PROFILE:
            return {
                ...state,
                noProfile: null
            }
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