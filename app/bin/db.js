require('dotenv').config()

const mongoose = require('mongoose')

const connection = () => {
     mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-4cxi0.mongodb.net/node-store`, { useNewUrlParser: true })

     mongoose.connection
          .on('error', console.error.bind(console, 'connection error: '))
          .once('open', function () {
               console.log(`>>> Database connect successfuly!`)
               console.log('---------------------------------')
          })

     return mongoose     
}



module.exports = (file) => {
     console.log(`>>> Connection module loaded in ${file}`)
     return connection 
}

