/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')

describe('Review routes without a seed data', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('`/api/reviews` URI', () => {
        it('GET responds with an empty array at first', () => {
            return request(app)
                .get('/api/reviews')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.eql([])
            })
        })
    })

    describe('`/api/reviews` URI', () => {
        const fakeReview = {
            title: 'Soo Good',
            rating: 3.5,
            content: 'what do you think this is'
        }
        const otherReview = {
            title: 'Soo Soo Good',
            rating: 5,
            content: 'you think what I think this is'
        }

        beforeEach(() => {
            return Review.create( fakeReview )
        })

        it('GET responds with a Review has been added', () => {
            return request(app)
                .get('/api/reviews')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].title).to.be.equal(fakeReview.title)
            })
        })

        it('POST creates a Review', () => {
            return request(app)
                .post('/api/reviews')
                .send(otherReview)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.title).to.equal(otherReview.title)
                    expect(res.body.rating).to.equal(otherReview.rating)
                    expect(res.body.content).to.equal(otherReview.content)
            })
        })
    })

    describe('`/api/reviews/:reviewId` URI', () => {
        const fakeReview = {
            title: 'Soo Good',
            rating: 3,
            content: 'what do you think this is'
        }

        beforeEach(() => {
            return Review.create( fakeReview )
        })

        it('GET responds with a specitic Review has been added', () => {
            return request(app)
                .get('/api/reviews/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.title).to.equal(fakeReview.title)
                    expect(res.body.rating).to.equal(fakeReview.rating)
                    expect(res.body.content).to.equal(fakeReview.content)
            })
        })

        describe('PUT & DELETE `/api/reviews/:reviewId` URI', () => {

            beforeEach(() => {
                return Review.update({
                    content: 'this is really soo good'
                }, {
                    where: { id: 1 }
                })
            })

            it('PUT update a specitic Review', () => {
                return request(app)
                    .put('/api/reviews/1')
                    .expect(200)
                    .expect(res => {
                        expect(res.body.content).to.equal('this is really soo good')
                })
            })

            it('DELETE remove a specitic Review', () => {
                return request(app)
                    .delete('/api/reviews/1')
                    .expect(204)
            })
        })
    })
})
