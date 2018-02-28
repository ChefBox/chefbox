const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  stats: Sequelize.ENUM('cart', 'paid', 'shipped') // eslint-disable-line new-cap
});

module.exports = Order

