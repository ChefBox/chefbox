/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchProducts, addProduct, editProduct, removeProduct} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Thunk creators:', () => {
  let store
  let mockAxios

  const initialState = [];

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchProducts', () => {
    it('fetches all products data', () => {
      const fakeProducts = [{
        name: 'Fakebox',
        description: 'Great meal!',
        ingredients: ['salt', 'pepper', 'milk', 'eggs'],
        price: 9.99,
        timeToPrep: 30,
        numberInStock: 99,
        calories: 5000
      }, {
        name: 'box',
        description: 'Amazing stuff!',
        ingredients: ['Pasta', 'Mustard', 'Kiwi'],
        price: 9.99,
        timeToPrep: 30,
        numberInStock: 99,
        calories: 5000
      }]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      return store.dispatch(fetchProducts())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_PRODUCTS')
          expect(actions[0].products).to.be.deep.equal(fakeProducts)
        })
    })
  })

  describe('addProduct', () => {
    it('adds a product to the store', () => {
      const fakeProduct = {
        name: 'NewFake',
        description: 'Favorite food!',
        ingredients: ['Lettuce', 'Peppers', 'Tomatoes', 'Dressing'],
        price: 10.95,
        timeToPrep: 25,
        numberInStock: 5,
        calories: 550,
      }
      mockAxios.onPost('/api/products').replyOnce(200, fakeProduct)
      return store.dispatch(addProduct())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('CREATE_PRODUCT')
          // expect(actions[0].product).to.be.deep.equal(fakeProduct)
        })
    })
  })

  describe('updateProduct', () => {
    it('updates a product in store', () => {
      const fakeProduct = {
        name: 'NewFake',
        description: 'Favorite food!',
        ingredients: ['Lettuce', 'Peppers', 'Apples', 'Dressing'],
        price: 10.95,
        timeToPrep: 25,
        numberInStock: 5,
        calories: 550
      }
      mockAxios.onPut('/api/products/1').replyOnce(200, fakeProduct)
      return store.dispatch(editProduct(fakeProduct, 1))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('UPDATE_PRODUCT')
          expect(actions[0].product).to.be.deep.equal(fakeProduct)
        })
    })
  })

  describe('removeProduct', () => {
    it('deletes a product from store', () => {
      mockAxios.onDelete('/api/products/1').replyOnce(200)
      return store.dispatch(removeProduct(1))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('DELETE_PRODUCT')
        })
    })
  })
})
