import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/_root'

const middleware = [thunk]
const initialState = {}
const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)))

export default store