const express = require('express')

// Controller
const order = require('../controllers/order')

const authService = require('../../bin/auth')

const router = express.Router()

router.post('/', authService.authorize, order.post)// Create

router.get('/', authService.authorize, order.get)// Read

router.get('/:code', authService.authorize, order.getOne)// Read one

//router.put('/:id', order.put)// Update/ underline*

//router.delete('/:id', order.remove)// Delete

module.exports = router