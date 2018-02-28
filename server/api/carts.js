'use strict';

const router = require('express').Router();
const { Cart } = require('../db/models');
module.exports = router;

router.get('/:cartId', (req, res, next) => {
  const cartId = req.params.cartId;
  Cart.findById(cartId)
    .then(cart => res.json(cart))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Cart.create(req.body)
  .then(cart => res.json(cart))
  .catch(next);
});

router.put('/:cartId', (req, res, next) => {
  Cart.update(req.body, {
    where: { id },
    returning: true
  })
  .then(([rowsUpdate, [cart]]) => {
    res.json(cart);
  })
  .catch(next);
})

router.delete('/:cartId', (req, res, next) => {
  const cartId = req.params.cartId;
  Cart.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next);
})
