const express = require('express')

// Controller
const order = require('../controllers/order')

const router = express.Router()

router.post('/', order.post)// Create

router.get('/', order.get)// Read

router.get('/:code', order.getOne)// Read one

//router.put('/:id', order.put)// Update/ underline*

//router.delete('/:id', order.remove)// Delete

module.exports = router