import * as types from '../actions/types'
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errReducer from './errReducer'
import profileReducer from './profileReducer'
import overlayReducer from './overlayReducer'

const appReducer = combineReducers({
    auth: authReducer,
    err: errReducer,
    profile: profileReducer,
    overlay: overlayReducer
})

const rootReducer = (state, action) => {
    if (action.type === types.LOGOUT_USER) {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer