const router = require('express').Router()
const { Order, LineItem } = require('../db/models')

module.exports = router

async function withCart(req, res, next) {

  // 1. We already have a cart.
  if (req.cart) return next()
  // 2. There is a cartId on the session
  // console.log('EXISTING', req.cart);

  if (req.session.cartId) {
    // TODO: Look up that order, and put it on req.cart
    // console.log('ON SESSION', req.session.cartId)
    // console.log('REQ.SESSION', req.sessionID)
    const order = await Order.findById(req.session.cartId)
    req.cart = order
    // console.log('ORDER', req.cart)
    return next()
  }

  [req.cart] = await Order.cartForUser(req.user, req.sessionID)

  // console.log('CART CREATED', req.cart);
  req.session.cartId = req.cart.id
  next()
  // console.log('cart on req', req.cart);
  // console.log('user on req', req.user);
}

router.use('/', withCart)

router.post('/', (req, res, next) => {
  // console.log('REQ.CART.ID in post', req.cart.id);
  const orderId = req.cart.id
  const { productId, quantity } = req.body;
  LineItem.create({ productId, quantity, orderId})
  .then(item => res.json(item))
  // .then(order.addProduct(product, {quantity: 1}))
  .catch(next)
});

router.delete('/item/:productId', (req, res, next) => {
  const productId = req.params.productId
  const orderId = req.cart.id
  LineItem.destroy({ where: { productId, orderId }})
  .then(() => res.sendStatus(204))
  .catch(next)
})
