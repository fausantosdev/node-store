const CostumerModel = require('../models/Costumer')

const md5 = require('md5')
const emailService = require('../../bin/email-service')

require('dotenv').config()

exports.post = async (req, res, next) => {// Create

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    const { name, email, password } = req.body

    let costumer = new CostumerModel({
        name,
        email,
        password: md5(password + process.env.API_KEY)
    })

    try {
        // Sanva o item no banco
        await costumer.save().then(() => {
            const subject = 'Bem vindo a NodeStore!'
            
            const text   = `Olá <strong>${name}</strong>!<br/>
                            Seja bem vindo a NodeStore.<br/> 
                            Lhe proporcionaremos as melhores experiências em compras.`

            emailService.send(email, subject, text)
        })

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
        const costumers = await CostumerModel.find({}).sort('-createdAt')// Do último pro primeiro

        res.status(200).json(costumers)

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
        const costumer = await CostumerModel.find({ slug: req.params.id })

        res.status(200).json(costumer)

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }
}

