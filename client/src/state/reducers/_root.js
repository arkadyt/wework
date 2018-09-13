import * as types from '../actions/types'
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errReducer from './errReducer'
import profileReducer from './profileReducer'
import postsReducer from './postsReducer'

const appReducer = combineReducers({
    auth: authReducer,
    err: errReducer,
    profile: profileReducer,
    posts: postsReducer
})

const rootReducer = (state, action) => {
    if (action.type === types.LOGOUT_USER) {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer