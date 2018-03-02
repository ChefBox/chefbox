'use strict';

const router = require('express').Router()
const { LineItem, Order } = require('../db/models')
module.exports = router

router.get('/order/:orderId', (req, res, next) => {
  const orderId = req.params.orderId
  LineItem.findAll({
    where: orderId
  })
  .then(item => res.json(item))
  .catch(next)
})

router.post('/order/:orderId', (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
  .then(order => {
    console.log('order: ', order);
    return LineItem.create(req.body)
    .then(item => item.setOrder(order))
  })
  .then(item => res.json(item))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  LineItem.update(req.body, {
    where: { id },
    returning: true
  })
  .then(([rowsUpdate, [item]]) => res.json(item))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  LineItem.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})


