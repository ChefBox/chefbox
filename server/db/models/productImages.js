const Sequelize = require('sequelize')
const db = require('../db')


const ProductImages = db.define('productImages', {
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: {msg: 'Invalid URL, try again'}
    }
  },
  altCaption: {
    type: Sequelize.STRING,
    allowNull: true,
  },
})

module.exports =
  ProductImages
