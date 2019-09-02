require('dotenv').config()

const CustumerModel = require('../models/Custumer')

const md5 = require('md5')

const emailService = require('../../bin/email-service')

const authService = require('../../bin/auth')

exports.post = async (req, res, next) => {// Create

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    const { name, email, password } = req.body

    let custumer = new CustumerModel({
        name,
        email,
        password: md5(password + process.env.API_KEY),
        roles: ['user']
    })

    try {
        // Sanva o item no banco
        await custumer.save().then(() => {
            const subject = 'Bem vindo a NodeStore!'

            const text = `Olá <strong>${name}</strong>!<br/>
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

exports.authenticate = async (req, res, next) => {// Autenticação.  

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    const { email, password } = req.body// Captura os dados de acesso.

    try {
        const data = await CustumerModel.findOne({// Pesquisa se ha usuários com os dados fornecidos.
            email,
            password: md5(password + process.env.API_KEY)
        })

        if (!data) {// Se não houver nenhum retorno.
            res.status(404).json({
                result: false
            })

            return // Para não proceguir com a requisição.
        }

        const token = await authService.generatedToken({
            id: data._id,
            email: data.email,
            password: data.password,
            roles: data.roles// user, admin ou user e admin.
        })

        res.status(200).send({// Retorna o token e os dados do usuário.
            token,
            data
        })

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }
}

exports.refreshToken = async (req, res, next) => {// Refresh token.  

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    const token = req.body.token || req.query.token || req.headers['x-access-token']// Captura o token

    const data = await authService.decodeToken(token)// Decodfica o token

    const custumer = await CustumerModel.findById(data.id)

    if (!custumer) {
        res.status(404).send({
            message: "Usuário ou senha inválidos!"
        })
    }

    //res.json(custumer)
    try {


        const tokenData = await authService.generatedToken({
            id: data._id,
            email: data.email,
            password: data.password,
            roles: data.roles// user, admin ou user e admin.
        })

        res.status(201).send({// Retorna o token e os dados do usuário.
            token: tokenData,// Novo token gerado.
            custumer// Dados do usuário.
        })

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
        const costumers = await CustumerModel.find({}).sort('-createdAt')// Do último pro primeiro

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
        const custumer = await CustumerModel.find({ slug: req.params.id })

        res.status(200).json(custumer)

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }
}

exports.remove = async (req, res, next) => {

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    try {
        const customer = await CustumerModel.findOne({ _id: req.params.id })

        if (!customer) {
            res.status(401).send("User not found")

            return
        }

        res.status(200).send("User removed")

    } catch (error) {

        res.status(500).send(false)
    }
}

