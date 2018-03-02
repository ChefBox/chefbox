/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Product = db.model('product')
const Review = db.model('review')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  it('has the expected schema definition', () => {
    expect(Product.attributes.name).to.be.an('object');
    expect(Product.attributes.description).to.be.an('object');
    expect(Product.attributes.ingredients).to.be.an('object');
    expect(Product.attributes.timeToPrep).to.be.an('object');
    expect(Product.attributes.availability).to.be.an('object');
    expect(Product.attributes.calories).to.be.an('object');
    expect(Product.attributes.numberInStock).to.be.an('object');

  });
  describe('Instance method GetAverageRating', () => {
    beforeEach(() => {
      return Promise.all([
        Product.create({ name: 'Fish Tacos', description: 'Amazingly yummy', ingredients: ['tacos', 'fish'], price: 19.00, timeToPrep: 30, availabilty: 'pending', numberInStock: 45, calories: 750 }),
        Product.create({ name: 'Jalapeno', description: 'Amazingly yummy', ingredients: ['ground beef', 'bun', 'onion', 'spice mix', 'pickles', 'jack cheese', 'ketchup'], price: 19.00, timeToPrep: 35, availabilty: 'pending', numberInStock: 45, calories: 650 }),
      ]);
    })
    it('returns undefined when no reviews are present', () => {
      return Product.findById(1)
      .then(product => product.getAverageRating())
      .then(rating => {
        return expect(rating).to.be.undefined
      })
    })
    it('returns null when no reviews are present', () => {
      return Product.findById(1, {
        include: {
          model: Review
        }
      })
      .then(product => product.getAverageRating())
      .then(rating => {
        return expect(rating).to.be.null
      })
    })
    it('returns a average review when reviews are present', () => {
      return Review.create({title: 'test', content: 'test', rating: 2, productId: 1})
      .then(() => Review.create({title: 'test', content: 'test', rating: 4, productId: 1}) )
      .then(() => Product.findById(1, {
        include: {
          model: Review
        }
      }))
      .then(product => product.getAverageRating())
      .then(rating => {
        return expect(rating).to.be.equal('3.0')
      })
    })
  })

})
