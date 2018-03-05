import axios from 'axios';

/**
 * ACTION TYPES
 */

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

/**
 * ACTION CREATORS
 */

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart
  }
}

const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product
  }
}

const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    productId
  }
}

/**
 * THUNK CREATORS
 */

export function fetchCart() {
  return function thunk (dispatch) {
    return axios.get('/api/cart')
    .then(res => res.data)
    .then(cart => dispatch(getCart(cart)))
  }
}

export function createItem (item) {
  return function thunk (dispatch) {
    return axios.post('/api/cart', item)
    .then(res => res.data)
    .then(newItem => dispatch(addToCart(newItem)))
  }
}

export function deleteItem (productId) {
  return function thunk (dispatch) {
    return axios.delete(`/api/cart/item/${productId}`)
    .then(item => dispatch(removeFromCart(productId)))
  }
}

export default function reducer (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return {...state, lineItems: [...state.lineItems, action.item]}
    case REMOVE_FROM_CART:
      const updatedItems = state.lineItems.filter(i => i.productId !== action.productId);
      return {...state, lineItems: updatedItems}
    default:
      return state
  }
}
