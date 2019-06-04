const express = require('express')
const bodyParser = require('body-parser')// Converte o corpo da requisição para json

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Rotas
const index = require('./routes/index')
const product = require('./routes/product')

app.use('/', index)
app.use('/product', product)
// Status: 200=ok, 201=created. 400=bad request, 401=não eutehticado, 403=acesso negado, 500=internal server error. 'status code'

module.exports = app
