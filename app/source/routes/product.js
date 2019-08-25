const express = require('express')

// Controller
const product = require('../controllers/product')

const authService = require('../../bin/auth')

const router = express.Router()

router.post('/', authService.authorize, product.post)// Create

router.get('/', authService.authorize, product.get)// Read

router.get('/:slug', product.getOne)// Read one

router.put('/:id', authService.authorize, product.put)// Update/ underline*

router.delete('/:id', authService.authorize, product.remove)// Delete

module.exports = router