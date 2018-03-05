'use strict'

import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT';

/**
 * ACTION CREATORS
 */
const getProduct = product => ({ type: GET_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProduct = id => dispatch =>
  axios.get(`/api/products/${id}`)
    .then(res => res.data)
    .then(product => dispatch(getProduct(product)))
    .catch(err => console.error(`Fetching product ${id} unsuccesful.`, err))

/**
 * Reducer
 */
export default function reducer(product = {}, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return action.product;
    default:
        return product;
    }
}