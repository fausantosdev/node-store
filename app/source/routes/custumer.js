const express = require('express')

// Controller
const custumer = require('../controllers/custumer')

const authService = require('../../bin/auth')

const router = express.Router()

router.post('/', custumer.post)// Create

router.post('/authenticate', custumer.authenticate)// Autentication, não precisa de autorização, pois aquí que a mesma será criada.

router.post('/refresh-token', authService.authorize, custumer.refreshToken)// Refresh token.

router.get('/', authService.authorize, custumer.get)// Read

router.get('/:id', custumer.getOne)// Read one

//router.put('/:id', custumer.update)// Read one

router.delete('/:id', custumer.remove)// Read one

module.exports = router