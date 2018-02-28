/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes without a seed data', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('`/api/products` URI', () => {
        it('GET responds with an empty array at first', () => {
            // when we make requests to `/api/products` we will get back an empty array
            return request(app)
                .get('/api/products')
                .expect(200)
                .expect('Content-Type', /json/) // tests response header
                .then(res => {
                    expect(res.body).to.eql([]) // tests response body
            })
        })
    })

    describe('`/api/products` URI', () => {
        const fakeProduct = {
            name: 'yamiyami',
            ingredients: ['carrot'],
            price: 10,
            timeToPrep: 0,
            numberInStock: 2,
            calories: 0,
            description: 'what do you think this is'
        }
        const otherProduct = {
            name: 'kakibox',
            ingredients: ['mushroom'],
            price: 20,
            timeToPrep: 3,
            numberInStock: 100,
            calories: 20,
            description: 'mountain mushroom'
        }

        beforeEach(() => {
            return Product.create( fakeProduct )
        })

        it('GET responds with a product has been added', () => {
            return request(app)
                .get('/api/products')
                .expect(200)
                .expect('Content-Type', /json/) // tests response header
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(fakeProduct.name)
            })
        })

        it('POST creates a product', () => {
            return request(app)
                .post('/api/products')
                .send(otherProduct)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(otherProduct.name)
                    expect(res.body.price).to.equal(otherProduct.price.toFixed(2))
                    expect(res.body.calories).to.equal(otherProduct.calories)
                    expect(res.body.description).to.equal(otherProduct.description)
                    expect(res.body.numberInStock).to.equal(otherProduct.numberInStock)
                    expect(res.body.timeToPrep).to.equal(otherProduct.timeToPrep)
                    expect(res.body.ingredients[0]).to.equal(otherProduct.ingredients[0])
                    // for agreement with team member
                    expect(res.body.availability).to.equal('pending') 
            })
        })
    })
    
    describe('`/api/products/:productId` URI', () => {
        const fakeProduct = {
            name: 'yamiyami',
            ingredients: ['carrot'],
            price: 10,
            timeToPrep: 0,
            numberInStock: 2,
            calories: 0,
            description: 'what do you think this is'
        }

        beforeEach(() => {
            return Product.create( fakeProduct )
        })

        it('GET responds with a specitic product has been added', () => {
            return request(app)
                .get('/api/products/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(fakeProduct.name)
                    expect(res.body.price).to.equal(fakeProduct.price.toFixed(2))
                    expect(res.body.calories).to.equal(fakeProduct.calories)
                    expect(res.body.description).to.equal(fakeProduct.description)
            })
        })

        describe('PUT & DELETE `/api/products/:productId` URI', () => {

            beforeEach(() => {
                return Product.update({
                    availability: 'available'
                }, {
                    where: { id: 1 }
                })
            })
    
            it('PUT update a specitic product', () => {
                return request(app)
                    .put('/api/products/1')
                    .expect(200)
                    .expect(res => {
                        expect(res.body.availability).to.equal('available')
                })
            })

            it('DELETE remove a specitic product', () => {
                return request(app)
                    .delete('/api/products/1')
                    .expect(204)
            })
        })
    })    
})