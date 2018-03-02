'use strict';

const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(order => res.json(order))
    .catch(next);
});

router.get('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then(order => res.json(order))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
  .then(order => res.json(order))
  .catch(next);
});

router.put('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId;
  Order.update(req.body, {
    where: { id: orderId },
    returning: true
  })
  .then(([rowsUpdate, [order]]) => {
    res.json(order);
  })
  .catch(next);
})

router.delete('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId;
  Order.destroy({
    where: { id: orderId }
  })
  .then(() => res.sendStatus(200))
  .catch(next);
})
