const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Category = db.model('category')

describe('category routes without a seed data', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('`/api/categories` URI', () => {
        it('GET responds with an empty array at first', () => {
            return request(app)
                .get('/api/categories')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.eql([])
            })
        })
    })

    describe('`/api/categories` URI', () => {
        const fakeCategory = {
            name: 'yamiyami',
            description: 'what do you think this is'
        }
        const otherCategory = {
            name: 'kakibox',
            description: 'mountain mushroom'
        }

        beforeEach(() => {
            return Category.create( fakeCategory )
        })

        it('GET responds with a Category has been added', () => {
            return request(app)
                .get('/api/categories')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(fakeCategory.name)
            })
        })

        it('POST creates a Category', () => {
            return request(app)
                .post('/api/categories')
                .send(otherCategory)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(otherCategory.name)
            })
        })
    })
    
    describe('`/api/categories/:CategoryId` URI', () => {
        const fakeCategory = {
            name: 'yamiyami',
            description: 'what do you think this is'
        }

        beforeEach(() => {
            return Category.create( fakeCategory )
        })

        it('GET responds with a specitic Category has been added', () => {
            return request(app)
                .get('/api/categories/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(fakeCategory.name)
                    expect(res.body.description).to.equal(fakeCategory.description)
            })
        })

        describe('PUT & DELETE `/api/categories/:categoryId` URI', () => {

            beforeEach(() => {
                return Category.update({
                    name: 'hiii'
                }, {
                    where: { id: 1 }
                })
            })
    
            it('PUT update a specitic Category', () => {
                return request(app)
                    .put('/api/categories/1')
                    .expect(200)
                    .expect(res => {
                        expect(res.body.name).to.equal('hiii')
                })
            })

            it('DELETE remove a specitic Category', () => {
                return request(app)
                    .delete('/api/categories/1')
                    .expect(204)
            })
        })
    })    
})
