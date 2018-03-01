const User = require('./user')
const Product = require('./product')
const ProductImages = require('./productImages')
const Category = require('./category')
const Review = require('./review')


const Order = require('./order')
const LineItem = require('./lineItem')


//ASSOCIATIONS
Product.hasMany(ProductImages)
Product.hasMany(Review)

Product.belongsToMany(Category, {through: 'Product_Category'})
Category.belongsToMany(Product, {through: 'Product_Category'})

User.hasMany(Review)


Order.hasMany(LineItem)
Order.belongsToMany(Product, {through: LineItem})
Order.belongsTo(User)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  ProductImages,
  Category,
  Review,
  Order
}
