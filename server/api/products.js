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
      },
      {
        model: Category
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
  let createAll = [];
  let productId = null
  Product.create(req.body)
    .then(product => {
      productId = product.id
      createAll = req.body.categories.map(category => {
        Category.findById(category.id)
          .then(category => {            
            return product.setCategories(category)
          })
      })
      createAll.push(ProductImages.create(req.body)
              .then(picture => product.setProductImages(picture)))
      return Promise.all(createAll)
    })
    .then(() => {
      return Product.findById(productId, {
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
      })}
    )
    .then(product => res.status(201).json(product))
    .catch(next)
})

router.put('/:productId', (req, res, next) => {
  const paramsId = req.params.productId
  let updateAll = []
  Product.update(req.body, { 
      where: { id: paramsId },
      returning: true,
    })
    .then(([rowsUpdate, [product]]) => {
      updateAll = req.body.categories.map(category => {
        Category.findAll({
          where: {name: category.name},
        })
          .then(([category]) => {
              return product.setCategories(category)
          })
      })
      updateAll.push(ProductImages.update(req.body.productImages[0], {
        where: { id: req.body.productImages[0].id }
      })
        .then(picture => product.setProductImages(picture)))
      return Promise.all(updateAll)
    })
    .then(() =>
      Product.findById(paramsId, {
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
          res.status(200).json(product)
        })
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
