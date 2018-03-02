const router = require('express').Router()
module.exports = router

//// in server/api/cart.js
// Cart:
//   1. Unauthed user, find or create an Order and somehow assoc with
//      the current session.
async function withCart(req, res, next) {
  // When we're done, req.cart exists and is an Order that
  // represents the current user's cart.
  
  // 1. We already have a cart. How? Who knows. Done.
  if (req.cart) return next()

  // 2. There is a cartId on the session
  if (req.session.cartId) {
    // TODO: Look up that order, and put it on req.cart
    return next()
  }
  
  req.cart = await Order.cartForUser(req.user)
  req.session.cartId = req.cart.id
  next()

  // 3. There isn't a cartId on the session, so we have to
  //    create a cart
  //    a. Nobody is logged in (req.user is null/undefined)
  //    b. Somebody is logged in (req.user is a User)
  //      i. They already have an Order that is in state: CART
  //      ii. They don't.
}

//// in server/db/models/order.js
Order.cartForUser = function(user) {
  if (!user) return Order.create()
  // Something like this...
  return Order.findOrCreate({
    where: {
      userId: user.id,
      status: 'cart',
    }
  })
}

router.use('/products', require('./products'))

router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
