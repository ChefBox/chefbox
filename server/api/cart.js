const router = require('express').Router()
const { Order, LineItem } = require('../db/models')

module.exports = router

async function withCart(req, res, next) {
  console.log('session cart', req.session.cartId)
  // 1. We already have a cart.
  if (req.cart) return next()
  // 2. There is a cartId on the session

  if (req.session.cartId) {
    // TODO: Look up that order, and put it on req.cart
    const order = await Order.findById(req.session.cartId)
    req.cart = order

    return next()
  }
  req.cart = await Order.cartForUser(req.user)
  req.session.cartId = req.cart.id
  next()
  // console.log('cart on req', req.cart);
  // console.log('user on req', req.user);
}

router.use('/', withCart)

router.post('/', (req, res, next) => {
  console.log('CART', req.cart);
  const orderId = req.cart.id;
  const { productId, quantity } = req.body;
  LineItem.create({ productId, quantity, orderId})
  .then(item => res.json(item))
  // .then(order.addProduct(product, {quantity: 1}))
  .catch(next)
});
