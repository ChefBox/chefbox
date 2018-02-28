const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('cart', 'paid', 'shipped'), // eslint-disable-line new-cap
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Order

