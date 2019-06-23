require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')// Converte o corpo da requisição para json

const home = require('../source/routes/home')
const product = require('../source/routes/product')

const app = express()

// Configs
    // App
    app.set('port', process.env.PORT)

    // Body parser
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    // Rotas
    app.use('/', home)
    app.use('/product', product)

module.exports = app
