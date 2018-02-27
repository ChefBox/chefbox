const Sequelize = require('sequelize')
const db = require('../index')


const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    ingredients: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    timeToPrep: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    availabiliy: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    averageRating:  {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    numberOfReviews: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    }
})