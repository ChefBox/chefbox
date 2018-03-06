import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import product from './product'
import categories from './categories'
import orders from './orders'
import reviews from './reviews'
const reducer = combineReducers({user, products, categories, cart: orders, reviews, product})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
// const initialState = localStorage.initialState
//   ? JSON.parse(localStorage.state)
//   : undefined

const store = createStore(reducer, middleware)

// store.subscribe(() => {
// localStorage.state = JSON.stringify(store.getState())
// });

export default store
export * from './user'
export * from './products'
export * from './product'
export * from './categories'
export * from './orders'
export * from './reviews'
