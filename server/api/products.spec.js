/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('GET /api/products', () => {
        it('GET responds with an empty array at first', () => {
            // when we make requests to `/api/products` we will get back an empty array
            return request(app)
                .get('/appi/users')
                .expect(200)
                .expect('Content-Type', /json/) // tests response header
                .then(res => {
                    expect(res.body).to.eql([]) // tests response body
            })
        })
    })

    describe('GET `/api/products`', () => {
        const fakeName = 'yamiyami'

        beforeEach(() => {
            return Product.create({
                name: fakeName
            })
        })

        it('GET `/api/products` responds with a product after a task has been added', () => {
            return request(app)
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /json/) // tests response header
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(fakeName)
            })
        })

        it('GET `/api/products/:productId`', ())
    })
})