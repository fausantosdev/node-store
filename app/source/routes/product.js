const express = require('express')

// Controller
const product = require('../controllers/product')

const router = express.Router()

router.post('/', product.post)// Create

router.get('/', product.get)// Read

router.get('/:slug', product.get)// Read one

router.put('/:_id', product.put)// Update/ underline*

router.delete('/:_id', product.remove)// Delete

module.exports = router