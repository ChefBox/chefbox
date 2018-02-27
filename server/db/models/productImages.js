const Sequelize = require('sequelize')
const db = require('../db')


const ProductImages = db.define('productImages', {
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      allowNull: false,
      isUrl: true,
    }
  },
  altCaption: {
    type: Sequelize.STRING,
    allowNull: true,
  },
})

module.exports =
  ProductImages
