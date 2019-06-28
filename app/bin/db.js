require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-4cxi0.mongodb.net/${process.env.DB_NAME}`, { useNewUrlParser: true })
//mongoose.connect('mongodb://localhost/' + process.env.DB_NAME, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
     console.log(`>>> Database connect successfuly!`)
     console.log('---------------------------------')
})

module.exports = db