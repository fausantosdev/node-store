const express = require('express')

// Controller
const custumer = require('../controllers/custumer')

const authService = require('../../bin/auth')

const router = express.Router()

router.post('/', custumer.post)// Create

router.post('/auth', custumer.authenticate)// Autentication

router.get('/', authService.authorize, custumer.get)// Read

router.get('/:id', custumer.getOne)// Read one


module.exports = router