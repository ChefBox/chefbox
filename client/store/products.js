import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

/**
 * ACTION CREATORS
 */
const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const getSearchResults = (results) => {
  return {
    type: GET_SEARCH_RESULTS,
    results
  }
}

const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id
  }
}

/**
 * THUNK CREATORS
 */
export function fetchProducts () {
  return function thunk (dispatch) {
    return axios.get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(getProducts(products)))
    .catch(err => console.error('Fetching products unsuccesful.', err))
  }
}

export function queryProducts (searchTerm) {
  return function thunk (dispatch) {
    return axios.get(`/api/products/search?q=${searchTerm}`)
    .then(res => res.data)
    .then(products => dispatch(getSearchResults(products)))
    .then(() => history.push('/'))
    .catch(err => console.error(`Searching products by ${searchTerm} unsuccesful.`, err))
  }
}

export function addProduct (product) {
  return function thunk (dispatch) {
    return axios.post('/api/products', product)
    .then(res => res.data)
    .then(newProduct => {
      dispatch(createProduct(newProduct))
      history.push(`/products/${newProduct.id}`)
    })
    .catch(err => console.error(`Creating product ${product} unsuccesful.`, err))
  }
}

export function editProduct (product, id) {
  return function thunk (dispatch) {
    return axios.put(`/api/products/${id}`, product)
    .then(res => res.data)
    .then(editedProduct => dispatch(updateProduct(editedProduct)))
    .catch(err => console.error(`Updating product ${product} unsuccesful.`, err))
  }
}

export function removeProduct (id) {
  return function thunk (dispatch) {
    return axios.delete(`/api/products/${id}`)
    .then(() => dispatch(deleteProduct(id)))
    .catch(err => console.error(`Deleting product (id: ${id}) unsuccesful.`, err))
  }
}

export default function reducer(products = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case GET_SEARCH_RESULTS:
      return action.results;
    case CREATE_PRODUCT:
      return [...products, action.product];
    case UPDATE_PRODUCT:
      return products.map(product => {
        return product.id === action.product.id ? action.product : product
      });
    case DELETE_PRODUCT:
      return products.filter(product => product.id !== action.id);
    default:
      return products;
  }
}
