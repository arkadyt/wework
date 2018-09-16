import * as types from '../actions/types'
import { combineReducers } from 'redux'
import userReducer from './userReducer'
import errReducer from './errReducer'
import profileReducer from './profileReducer'
import postsReducer from './postsReducer'

const appReducer = combineReducers({
    user: userReducer,
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