const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,// Tornar esse campo único
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{// array
        type: String,
        required: true,
    }],
    image: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)

