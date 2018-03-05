import axios from 'axios';

/**
 * ACTION TYPES
 */

const GET_CART = 'GET_CART'
// const ADD_TO_CART = 'ADD_TO_CART';
// const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// const GET_ORDERS = 'GET_ORDERS';
// const CREATE_ORDER = 'CREATE_ORDER';
// const UPDATE_ORDER = 'UPDATE_ORDER';
// const DELETE_ORDER = 'DELETE_ORDER';

/**
 * ACTION CREATORS
 */

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart
  }
}

// const addToCart = (product) => {
//   return {
//     type: ADD_TO_CART,
//     product
//   }
// }

// const removeFromCart = (productId) => {
//   return {
//     type: removeFromCart,
//     productId
//   }
// }

// const getOrders = (orders) => {
//   return {
//     type: GET_ORDERS,
//     orders
//   }
// }

// const createOrder = (order) => {
//   return {
//     type: CREATE_ORDER,
//     order
//   }
// }

// const updateOrder = (order) => {
//   return {
//     type: UPDATE_ORDER,
//     order
//   }
// }

// const deleteOrder = (id) => {
//   return {
//     tyoe: DELETE_ORDER
//   }
// }

/**
 * THUNK CREATORS
 */

export function fetchCart() {
  return function thunk (dispatch) {
    return axios.post('api/cart')
    .then(res => res.data)
    .then(cart => dispatch(getCart(cart)))
  }
}

// // export function createItem (item) {
// //   return function thunk (dispatch) {
// //     return axios.post('/api/cart', item)
// //     .then(res => res.data)
// //     .then(item => dispatch(addToCart))
// //   }
// // }

// export function deleteItem (itemId) {
//   return function thunk (dispatch) {
//     return axios.delete('/api/cart')
//     .then(item => dispatch(deleteFromCart(itemId)))
//   }
// }

// export function fetchOrders() {
//   return function thunk(dispatch) {
//     return axios.get('/api/order')
//     .then(res => res.data)
//     .then(orders => dispatch(getOrders(orders)))
//     .catch(err => console.error('Fetching orders failed.', err))
//   }
// }

// export function fetchOrder (id) {
//   return function thunk (dispatch) {
//     return axios.get(`/api/order/${id}`)
//     .then(res => res.data)
//     .then(order => dispatch(getOrder(order)))
//     .catch(err => console.error('Fetching order failed.', err))
//   }
// }

// export function addOrder (order) {
//   return function thunk (dispatch) {
//     return axios.post('/api/order', order)
//     .then(res => res.data)
//     .then(newOrder => dispatch(newOrder))
//     .catch(err => console.error('Adding order failed.', err))
//   }
// }

// export function editOrder (order) {
//   return function thunk (dispatch) {
//     return axios.put(`/api/order/${order.id}`)
//     .then(updatedOrder => dispatch(updatedOrder))
//     .catch(err => console.error('Updating order failed.', err))
//   }
// }

// export function removeOrder (id) {
//   return function thunk (dispatch) {
//     return axios.delete(`/api/order/${order.id}`)
//     .then(() => dispatch(deleteOrder(id)))
//     .catch(err => console.error('Deleting order unsuccessful.', err))
//     }
//   }


export default function reducer (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
