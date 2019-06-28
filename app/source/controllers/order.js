const OrderModel = require('../models/Order')

const functions = require('../../bin/functions')

exports.post = async (req, res, next) => {// Create

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    const { costumer, items, total } = req.body

    let order = new OrderModel({
        code: functions.makeHash(6),
        costumer,
        items,  
        total
    })

    try {
        // Sanva o item no banco
        await order.save()

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
        const orders = await  OrderModel.find({}, 'code status').sort('-createdAt')// Do último pro primeiro
        .populate('costumer', 'name')// A função populate popula os campos na hora do g, por exemplo, com o id do usuário ele retorna as informações do usuário.
        .populate('items.product', 'title')

        res.status(200).json(orders)    

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
        const order = await  OrderModel.find({ slug: req.params.code })

        res.status(200).json(order)

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }
}

