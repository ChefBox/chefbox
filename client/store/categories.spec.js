/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchCategories, addCategory, editCategory, removeCategory} from './categories'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
//left this as it was in boiler in case it's needed later
//import history from '../history'

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

  describe('fetchCategories', () => {
    it('fetches all categories data', () => {
      const fakeCategories = [{
        name: 'Fake Category',
        description: 'Whats up Aaron, you read my code!',
      }, {
        name: 'Another Category',
        description: 'And you read it well',
      }]
      mockAxios.onGet('/api/categories').replyOnce(200, fakeCategories)
      return store.dispatch(fetchCategories())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_CATEGORY')
          expect(actions[0].categories).to.be.deep.equal(fakeCategories)
        })
    })
  })

  describe('addCategory', () => {
    it('adds a category to the store', () => {
      const fakeCategory = {
        name: 'NewFake Cateogry',
        description: 'BLAHHHH',
      }
      mockAxios.onPost('/api/categories').replyOnce(200, fakeCategory)
      return store.dispatch(addCategory())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('CREATE_CATEGORY')
          expect(actions[0].category).to.be.deep.equal(fakeCategory)
        })
    })
  })

  describe('updateCategory', () => {
    it('updates a category in store', () => {
      const fakeCategory = {
        name: 'NewFake Cat',
        description: 'KITTY!',
      }
      mockAxios.onPut('/api/categories/1').replyOnce(200, fakeCategory)
      return store.dispatch(editCategory(fakeCategory, 1))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('UPDATE_CATEGORY')
          expect(actions[0].category).to.be.deep.equal(fakeCategory)
        })
    })
  })

  describe('removeCateogry', () => {
    it('deletes a category from store', () => {
      mockAxios.onDelete('/api/categories/1').replyOnce(200)
      return store.dispatch(removeCategory(1))
        .then(() => {
          const actions = store.getActions()
          console.log('ACTIONS', actions)
          expect(actions[0].type).to.be.equal('DELETE_CATEGORY')
        })
    })
  })
})