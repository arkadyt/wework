import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errReducer from './errReducer'
import profileReducer from './profileReducer'

export default combineReducers({
    auth: authReducer,
    err: errReducer,
    profile: profileReducer
})