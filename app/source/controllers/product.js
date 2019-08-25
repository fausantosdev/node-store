const ProductModel = require('../models/Product')

const azure = require('azure-storage')

const makeHash = require('../../bin/functions').makeHash

exports.post = async (req, res, next) => {// Create

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    /*let filename = makeHash(30) + '.jpg'
    let rawData = req.body.image
    let matches = rawData.match(/^data:([A-Za-z+\/]+);base64,(.+)$/)
    let type = matches[1]
    let buffer = new Buffer(matches[2], 'base64')*/

    let product = new ProductModel(req.body)

    try {
        // Sanva o item no banco
        await product.save()

        res.status(200).json({ create: true })

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }
}

exports.get = async (req, res, next) => {// Read

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    try {
        const products = await ProductModel.find({}).sort('-createdAt')// Do último pro primeiro

        res.status(200).json(products)

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }

}

exports.getOne = async (req, res, next) => {// Read one

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    try {
        const product = await ProductModel.find({ slug: req.params.slug })

        res.status(200).json(product)

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }
}

exports.put = async (req, res, next) => {// Update

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    try {
        await ProductModel.updateOne({ _id: req.params.id }, req.body)

        res.status(200).json({ update: true })

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }
}

exports.remove = async (req, res, next) => {// Delete

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    try {
        await ProductModel.deleteOne({ _id: req.params.id })

        res.status(200).json({ delete: true })

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }
}