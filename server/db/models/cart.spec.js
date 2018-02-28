const { expect } = require('chai')
const db = require('../index')
const Cart = db.model('cart')


describe('Carts have the correct schema definition', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('has the expected schema definition', () => {
    expect(Cart.attributes.productIds).to.be.an('object');

  })
});
