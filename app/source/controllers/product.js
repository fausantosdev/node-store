const ProductModel = require('../models/Product')

exports.post = (req, res, next) => {// Create

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    console.log('---------------------------------')
        

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

exports.get = (req, res, next) => {// ReadOne

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    console.log('---------------------------------')
    
    ProductModel
    .find({})
    .then(data => {
        res.status(200).send(data)
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

    ProductModel.updateOne(req.params.id, req.body)
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

    ProductModel.deleteOne(req.params._id)
        .then(() => {
            res.status(200).send({ delete: true })
        })
        .catch(error => {
            res.status(400).send(error) 
        })
}