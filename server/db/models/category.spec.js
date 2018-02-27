const { expect } = require('chai')
const db = require('../index')
const Categories = db.model('category')


describe('Categories have the correct schema definition', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('has the expected schema definition', () => {
    expect(Categories.attributes.name).to.be.an('object');
    expect(Categories.attributes.description).to.be.an('object');
  })
});
