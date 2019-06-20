const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store",
        version: "0.0.1"
    })
    
    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    console.log('---------------------------------')
})

module.exports = router

