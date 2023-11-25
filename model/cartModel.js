const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    images: {
        type: Array
    },
    quantity: {
        type: Number
    },actualId: {
        type: String
    },
    currentUser: String
})

const cartItems = mongoose.model('Cart', cartSchema)

module.exports = cartItems