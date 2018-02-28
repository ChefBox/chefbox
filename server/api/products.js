'use strict ';

const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products => res.json(products))
        .catch(next)
})

// Possibly for the future, or for other routes,
// you can use router.param:
router.param('productId', (req, res, next) =>
    Product.findById(req.params.productId)
        .then(product => req.product = product)
        .then(() => next)
        .catch(next))

router.get('/:productId', (req, res, next) => {
    res.json(req.product)
})

router.post('/', (req, res, next) => {
    Product.create(req.body)
        .then(product => 
            res.status(201).json(product)
        )
        .catch(next)
})

router.put('/:productId', (req, res, next) => {
    const id = req.params.productId
    
    Product.update(req.body, {
        where: { id },
        returning: true,
    })
        .then(([rowsUpdate, [product]]) => 
            res.json(product)
        )
        .catch(next)
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.destroy({
        where: { id }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})