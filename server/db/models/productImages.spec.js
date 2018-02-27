/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const ProductImages = db.model('productImages')

describe('ProductImages model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  it('has the expected schema definition', () => {
    expect(ProductImages.attributes.imageUrl).to.be.an('object');
    expect(ProductImages.attributes.altCaption).to.be.an('object');
  });

})

