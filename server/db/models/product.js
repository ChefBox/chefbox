const Sequelize = require('sequelize')
const db = require('../db')


const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    ingredients: {
        type: Sequelize.ARRAY(Sequelize.STRING), // eslint-disable-line new-cap
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),  // eslint-disable-line new-cap
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    },
    timeToPrep: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    },
    availability: {
        type: Sequelize.ENUM('available', 'pending', 'out of stock'), // eslint-disable-line new-cap
        allowNull: false,
        defaultValue: 'pending'
    },
    numberInStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    },
    calories: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    }
})

Product.prototype.getAverageRating = function(){
  if (this.reviews === undefined){
    return undefined
  } else if (!this.reviews.length){
    return null
  }
  const avg = this.reviews.reduce((sum, review) => sum + review.rating, 0) / this.reviews.length
  return avg.toFixed(1)
}

module.exports = Product
