const router = require('express').Router()
const { Order, LineItem, Product } = require('../db/models')
const nodemailer = require('nodemailer');
const Op = require('sequelize').Op

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

    const order = Order.findOne( {
      where: {
        status: 'cart',
        id: req.session.cartId,
        },
        include: [
            Product
        ]
      }
    )
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
  const body = req.cart.products.reduce((tableBody, product) => {
    const lineItem = product.lineItem
    return tableBody + `<tr><td>${product.name}</td><td>$${product.price}</td>${lineItem.quantity}<td></td><td>$${product.price * lineItem.quantity}</td></tr>\n`
  }, '')
  const mailOptions = {
    from: process.env.GMAIL_USERNAME, // sender address
    to: req.user.email, // list of receivers
    subject: 'Thank you for your order', // Subject line
    html: ` You paid $${req.body.price}
      <table>
        <thead>
          <tr>
            <td>Box</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>SubTotal</td>
          </tr>
        </thead>
        <tbody>
          ${body}
        </tbody>
      </table>
    `// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {res.send(err)}
    else {
      try {
        // const result = req.user.setOrders(req.cart) //set to user
        const result = req.cart.setUser(req.user)
        result.then(() => req.cart.update({status: 'paid'})) //update paid
        .then(() => {
          req.cart = undefined
          req.session.cartId = undefined
          return res.send(info)
        })
        .catch(console.error.bind(console, 'THERE WAS TOTALLY A PROBLEM'))
      } catch (tErr) {
        console.error(tErr)
      }
    }
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
      res.status(204).send('Item deleted successfully. ' + productId + ' ' + orderId)})
    .catch(next)
})
