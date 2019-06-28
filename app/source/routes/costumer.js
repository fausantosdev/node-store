const express = require('express')

// Controller
const costumer = require('../controllers/costumer')

const router = express.Router()

router.post('/', costumer.post)// Create

router.get('/', costumer.get)// Read

router.get('/:id', costumer.getOne)// Read one


module.exports = router