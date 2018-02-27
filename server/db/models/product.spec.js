/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  it('has the expected schema definition', () => {
    expect(Product.attributes.name).to.be.an('object');
    expect(Product.attributes.description).to.be.an('object');
    expect(Product.attributes.ingredients).to.be.an('object');
    expect(Product.attributes.timeToPrep).to.be.an('object');
    expect(Product.attributes.availabiliy).to.be.an('object');
    expect(Product.attributes.calories).to.be.an('object');
    expect(Product.attributes.numberInStock).to.be.an('object');

  });

})

