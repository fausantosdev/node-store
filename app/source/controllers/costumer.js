const CostumerModel = require('../models/Costumer')

exports.post = async (req, res, next) => {// Create

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    let costumer = new CostumerModel(req.body)

    try {
        // Sanva o item no banco
        await costumer.save()

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

