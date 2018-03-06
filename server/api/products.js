'use strict ';

const router = require('express').Router()
const { Product, Review, ProductImages, Category } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({
    include: [
      {
        attributes: ['rating'],
        model: Review,
      },
      {
        model: ProductImages
      }
    ]
  })
    .then(products => {
      for (let product of products){
        product.dataValues.averageRating = product.getAverageRating()
      }
      return products
    })
    .then(products => {
      res.json(products)
    })
    .catch(next)
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findById(id, {
    include: [
      { model: Review },
      { model: ProductImages },
      {
        attributes: ['name'],
        model: Category,
        through: {
          attributes: []
        }
      }
    ]
  })
    .then(product => res.json(product))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product =>
      Product.findById(product.id, {
        include: [
          { model: Review },
          { model: ProductImages },
          {
            attributes: ['name'],
            model: Category,
            through: {
              attributes: []
            }
          }
        ]
      })
    )
    .then(product => res.status(201).json(product))
    .catch(next)
})

router.put('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.update(req.body, {
    where: { id },
    returning: true,
  })
    .then(() => {
      return Product.findById(id, {
        include: [
          { model: Review },
          { model: ProductImages },
          {
            attributes: ['name'],
            model: Category,
            through: {
              attributes: []
            }
          }
        ]
      })
        .then(product => {
          res.json(product)
        })
    })
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
