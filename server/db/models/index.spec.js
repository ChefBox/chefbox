const { expect } = require('chai')
const db = require('../index')
const ProductImages = db.model('productImages')
const ProductCategories = db.model('Product_Categories')


describe('Product Categories are associated with product and category', () => {
    beforeEach(() => {
      return db.sync({ force: true })
    })
  
    it('has a productId object', () => {
      expect(ProductCategories.attributes.productId).to.be.an('object');
    })
      it('has a categoryId object', ()=> {
        expect(ProductCategories.attributes.categoryId).to.be.an('object');
      })
  })


describe('Product Images are associated with the product', () => {
    beforeEach(() => {
        return db.sync({ force: true })
      })
      it('has a productId object', ()=> {
          expect(ProductImages.attributes.productId).to.be.an('object');
      })
})
