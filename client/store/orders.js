import axios from 'axios';

/**
 * ACTION TYPES
 */

const GET_ORDER = 'GET_ORDER';
const CREATE_ORDER = 'CREATE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';

/**
 * ACTION CREATORS
 */

const getOrder = (order) => {
  return {
    type: GET_ORDER,
    order
  }
}

const createOrder = (order) => {
  return {
    type: CREATE_ORDER,
    order
  }
}

const updateOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    order
  }
}

const deleteOrder = (id) => {
  return {
    tyoe: DELETE_ORDER
  }
}

/**
 * THUNK CREATORS
 */

export function fetchOrder (id) {
  return function thunk (dispatch) {
    return axios.get(`api/order/${id}`)
    .then(res => res.data)
    .then(order => dispatch(getOrder(order)))
    .catch(err => console.error('Fetching order failed.', err))
  }
}

export function addOrder (order) {
  return function thunk (dispatch) {
    return axios.post('api/order', order)
    .then(res => res.data)
    .then(newOrder => dispatch(newOrder))
    .catch(err => console.error('Adding order failed.', err))
  }
}

export function editOrder (order) {
  return function thunk (dispatch) {
    return axios.put(`api/order/${order.id}`)
    .then(updatedOrder => dispatch(updatedOrder))
    .catch(err => console.error('Updating order failed.', err))
  }
}

export function removeOrder (id) {
  return function thunk (dispatch) {
    return axios.delete(`api/order/${order.id}`)
    .then(() => dispatch(deleteOrder(id)))
    .catch(err => console.error('Deleting order unsuccessful.', err))
    }
  }

