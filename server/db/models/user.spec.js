/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe.only('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  it('has the expected schema definition', () => {
    expect(User.attributes.email).to.be.an('object');
    expect(User.attributes.password).to.be.an('object');
    expect(User.attributes.salt).to.be.an('object');
    expect(User.attributes.googleId).to.be.an('object');
    expect(User.attributes.role).to.be.an('object');
    expect(User.attributes.active).to.be.an('object');
    expect(User.attributes.address).to.be.an('object');
    expect(User.attributes.city).to.be.an('object');
    expect(User.attributes.state).to.be.an('object');
    expect(User.attributes.zip).to.be.an('object');
    expect(User.attributes.firstName).to.be.an('object');
    expect(User.attributes.lastName).to.be.an('object');

  });
  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          firstName: 'Cody',
          lastName: 'Doe',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
