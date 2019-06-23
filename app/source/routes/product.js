const express = require('express')

// Controller
const product = require('../controllers/product')

const router = express.Router()

router.post('/', product.post)// Create

router.get('/', product.get)// Read

router.get('/:slug', product.getOne)// Read one

router.put('/:id', product.put)// Update/ underline*

router.delete('/:id', product.remove)// Delete

module.exports = router