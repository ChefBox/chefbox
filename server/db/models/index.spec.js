const { expect } = require('chai')
const db = require('../index')
const ProductImages = db.model('productImages')
const Order = db.model('order')
const ProductCategory = db.model('Product_Category')


describe('Product Categories are associated with product and category', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('has a productId object', () => {
    expect(ProductCategory.attributes.productId).to.be.an('object');
  });
  it('has a categoryId object', () => {
    expect(ProductCategory.attributes.categoryId).to.be.an('object');
  });
});

describe('Product Images are associated with the product', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  it('has a productId object', () => {
    expect(ProductImages.attributes.productId).to.be.an('object');
  });
});

describe('Orders are associated with users', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  it('has a userId object', () => {
    expect(Order.attributes.userId).to.be.an('object');
  });
});
