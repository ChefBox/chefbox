'use strict ';

const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products = res.json(products))
        .catch(next)
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.findById()
        .then(product => res.json(product))
        .catch(next)
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
            res.json(campus)
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