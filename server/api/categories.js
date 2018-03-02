'use strict';
const router = require('express').Router()
const { Category } = require('../db/models')

router.get('/', (req, res, next) => {
    Category.findAll()
        .then(categories => res.json(categories))
        .catch(next)
})

router.get('/:categoryId', (req, res, next) => {
    const id = req.params.categoryId
    Category.findById(id)
        .then(category => res.json(category))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Category.create(req.body)
        .then(newCategory =>
        res.status(201).json(newCategory)
    ).catch(next)
})


router.put('/:categoryId', (req, res, next) => {
    const id = req.params.categoryId
    Category.update(req.body, {
        where: {id},
        returning: true
    })
    .then(([rowsUpdate, [newCategory]]) =>
        res.json(newCategory)
    ).catch(next)
})


router.delete('/:categoryId', (req, res, next) => {
    const id = req.params.categoryId
    Category.destroy({
        where: {id}
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router
