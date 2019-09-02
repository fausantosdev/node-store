const express = require('express')

// Controller
const product = require('../controllers/product')

const authService = require('../../bin/auth')

const router = express.Router()

router.post('/', authService.isAdmin, product.post)// Create

router.get('/', authService.authorize, product.get)// Read

router.get('/:slug', product.getOne)// Read one

router.put('/:id', authService.isAdmin, product.put)// Update

router.delete('/:id', authService.isAdmin, product.remove)// Delete

module.exports = router