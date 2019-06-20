require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-4cxi0.mongodb.net/node-store`, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Database not connect: '));
db.once('open', function () {
     console.log('>>> Database connect successfuly!')
});

module.exports = db