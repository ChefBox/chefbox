import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import categories from './categories'

const reducer = combineReducers({user, products})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const initialState = localStorage.initialState
  ? JSON.parse(localStorage.state)
  : undefined

const store = createStore(reducer, initialState, middleware)

store.subscribe(() => {
localStorage.state = JSON.stringify(store.getState())
});

export default store
export * from './user'
export * from './products'
export * from './categories'
