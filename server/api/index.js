const router = require('express').Router()
module.exports = router

router.use('/products', require('./products'))
router.use('/categories', require('./categories'))

router.use('/users', require('./users'))

router.use('/order', require('./order'))

router.use('/line-items', require('./lineItems'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
