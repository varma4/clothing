const mongoose = require('mongoose')

productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product must have a Name']
    },
    price: {
        type: Number,
        required: [true, 'Product must have a price']
    },
    images: {
        type: Array,
        required: [true, 'Product must have images']
    },
    productType: {
        type: String,
        required: [true, 'Product must have a type']
    },
    quantity: {
        type: Number,
        required: [true, 'Product must have a quantity']
    }
})

const Products = mongoose.model('Products', productSchema)

module.exports = Products