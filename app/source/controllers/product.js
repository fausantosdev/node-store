const ProductModel = require('../models/Product')

const connection = require('../../bin/db')(__filename)// Carrega módulo mas não abre a conexão!

exports.post = (req, res, next) => {// Create

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    console.log('---------------------------------')

    connection()// A conexão dele ser estabelecida antes do módel.
        
    let product = new ProductModel(req.body)

    // Sanva o item no banco
    product
    .save()
    .then(() => {
        res.status(200).send(product)
    })
    .catch(error => {
        res.status(400).send(error) 
    })
}

exports.get = (req, res, next) => {// Read

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    
    connection()// Estabelece a conexão apenas quando a rota é chamada.

    ProductModel.find({})
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(400).send(error) 
    })
}

exports.getOne = (req, res, next) => {// Read one

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    
    connection()// Estabelece a conexão apenas quando a rota é chamada.

    ProductModel.find({ slug: req.params.slug })
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(400).send(error) 
    })
}

exports.put = (req, res, next) => {// Update

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    console.log('---------------------------------')

    connection()

    ProductModel.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.status(200).send({ update: true })
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.remove = (req, res, next) => {// Delete

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    console.log('---------------------------------')

    connection()

    ProductModel.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).send({ delete: true })
        })
        .catch(error => {
            res.status(400).send(error) 
        })
}