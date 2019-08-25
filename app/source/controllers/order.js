const OrderModel = require('../models/Order')

const functions = require('../../bin/functions')

const authService = require('../../bin/auth')

exports.post = async (req, res, next) => {// Create

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    // Recupera o token.
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    // Decodifica o token.
    const data = await authService.decodeToken(token)// Id, email e senha do usuário.

    const { /*costumer,*/ items } = req.body

    //res.json(data)

    let order = new OrderModel({
        code: functions.makeHash(12),
        custumer: data.id,// Que foi extraído do token.
        items// Que serão fornecidos pelo front.
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
        const orders = await OrderModel.find({}/*, 'code status items'*/).sort('-createdAt')// Do último pro primeiro
            .populate('custumer', 'name')// A função populate popula os campos na hora do g, por exemplo, com o id do usuário ele retorna as informações do usuário.
            .populate('items.product', 'title')

        res.status(200).json(orders)

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }

}

exports.getOne = async (req, res) => {// Read one

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    try {
        const order = await OrderModel.findOne({ code: req.params.code })
            .populate('costumer', 'name')

        res.status(200).json(order)

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }
}

