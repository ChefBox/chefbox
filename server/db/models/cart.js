const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  productIds: {
    type: Sequelize.ARRAY(Sequelize.INTEGER), // eslint-disable-line new-cap
    defaultValue: []
  }
});

module.exports = Cart;
