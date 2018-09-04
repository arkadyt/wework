import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errReducer from './errReducer'
import profileReducer from './profileReducer'
import overlayReducer from './overlayReducer'

export default combineReducers({
    auth: authReducer,
    err: errReducer,
    profile: profileReducer,
    overlay: overlayReducer
})