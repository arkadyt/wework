import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/_root'

let store
const middleware = [thunk]
const initialState = {}

if (process.env.NODE_ENV === 'development') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)))
} else {
  store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)))
}

export default store







