const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true
    },
    custumer: {
        type: mongoose.Schema.Types.ObjectId,// <-- referencia o cliente
        ref: 'Custumer'
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,// < referencia o produto
            ref: 'Product'
        },
        price: {
            type: Number,
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
            default: 1
        }
    }],
}, {
        timestamps: true
    })

module.exports = mongoose.model('Order', orderSchema)

