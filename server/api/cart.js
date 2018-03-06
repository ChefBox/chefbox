const router = require('express').Router()
const { Order, LineItem, Product } = require('../db/models')
const nodemailer = require('nodemailer');

module.exports = router

function makeCart(req, next) {
  const cartResult = Order.cartForUser(req.user)
  cartResult.then((cart) => {
    req.cart = Array.isArray(cart) ? cart[0] : cart
    req.session.cartId = req.cart.id
    return next()
  })
}

function withCart(req, res, next) {

  if (req.cart) return next()

  if (req.session.cartId) {
    console.log('CART ID IS ON SESSION ROUTE')
    const order = Order.findById(req.session.cartId)
    order.then(cart => {
      if (cart === null) {
        req.session.cartId = undefined;
        return makeCart(req, next)
      } else {
        req.cart = cart
        return next()
      }
    })
    .catch(next)

  } else {
    makeCart(req, next)
  }

}

router.use('/', withCart)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: process.env.GMAIL_USERNAME,
         pass: process.env.GMAIL_PASSWORD

     }
 });


router.post('/checkout', (req, res, next) => {
  const mailOptions = {
    from: process.env.GMAIL_USERNAME, // sender address
    to: 'brainomite@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: `<p>${JSON.stringify(req.cart)}</p>`// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {res.send(err)}
    else {res.send(info);}
  });
})

router.get('/', (req, res, next) => {
  const cartId = req.cart.id
  Order.findById(cartId, {
    include: [{
      model: LineItem
    }, {
      model: Product
    }]
  })
    .then(cart => res.json(cart))
    .catch(next)
})

router.post('/', (req, res, next) => {
  const orderId = req.cart.id
  const { productId, quantity } = req.body;
  LineItem.create({ productId, quantity, orderId })
    .then(() => {
      return Order.findById(orderId, {
        include: [{
          model: LineItem
        }, {
          model: Product
        }]
      })
      .then(cart => {
        res.json(cart)
      })
      .catch(next)
    })
    .catch(next)
});

router.delete('/item/:productId', (req, res, next) => {
  const productId = req.params.productId
  const orderId = req.cart.id

  LineItem.destroy({ where: { productId, orderId } })
    .then(() => {
      console.log({productId, orderId})
      res.status(204).send('Item deleted successfully. ' + productId + ' ' + orderId)})
    .catch(next)
})
