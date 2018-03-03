const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('cart', 'paid', 'shipped'), // eslint-disable-line new-cap
    allowNull: false,
    defaultValue: 'cart',
    validate: {
      notEmpty: true
    }
  },
  sessionId: {
    type: Sequelize.STRING
  }
});

Order.cartForUser = function(user, sessionId) {
  console.log('cart for user')
  if (!user) {
    return Order.findOrCreate({
      where: {
        sessionId: sessionId
      }
    })
  }
  return Order.findOrCreate({
    where: {
      userId: user.id,
      status: 'cart',
    }
  })
}

module.exports = Order
