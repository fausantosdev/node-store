const express = require('express')

// Controller
const costumer = require('../controllers/costumer')

const authService = require('../../bin/auth')

const router = express.Router()

router.post('/', costumer.post)// Create

router.post('/auth', costumer.authenticate)// Autentication

router.get('/', authService.authorize, costumer.get)// Read

router.get('/:id', costumer.getOne)// Read one


module.exports = router