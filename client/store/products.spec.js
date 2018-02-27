/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchProducts, addProduct, editProduct, removeProduct, getProducts} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
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
        name: 'Fakebox',
        description: 'Great meal!',
        ingredients: ['salt', 'pepper', 'milk', 'eggs'],
        price: 9.99,
        timeToPrep: 30,
        numberInStock: 99,
        calories: 5000
      }]
      console.log('got here!');
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      console.log('dispatch++++++++++++ :' , store.dispatch(fetchProducts()));
      return store.dispatch(fetchProducts())
        .then(() => {
          const actions = store.getActions()
          console.log('+++++++++++++++++++++++' , actions);
          expect(actions[0].type).to.be.equal('GET_PRODUCTS')
          expect(actions[0].products).to.be.deep.equal(fakeProducts)
        })
    })
  })

  // describe('logout', () => {
  //   it('logout: eventually dispatches the REMOVE_USER action', () => {
  //     mockAxios.onPost('/auth/logout').replyOnce(204)
  //     return store.dispatch(logout())
  //       .then(() => {
  //         const actions = store.getActions()
  //         expect(actions[0].type).to.be.equal('REMOVE_USER')
  //         expect(history.location.pathname).to.be.equal('/login')
  //       })
    // })
  // })
})
