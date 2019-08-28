require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')// Converte o corpo da requisição para json

const home = require('../source/routes/home')
const product = require('../source/routes/product')
const custumer = require('../source/routes/custumer')
const order = require('../source/routes/order')

const app = express()

// Configs
// Database connect
require('./db')

// App
app.set('port', process.env.PORT)

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Rotas
app.use('/', home)
app.use('/product', product)
app.use('/custumer', custumer)
app.use('/order', order)

module.exports = app
