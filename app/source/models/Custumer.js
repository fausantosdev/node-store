const mongoose = require('mongoose')

const custumerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    roles: [{// array
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
    }]
}, {
        timestamps: true
    })

module.exports = mongoose.model('Custumer', custumerSchema)

