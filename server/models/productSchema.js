const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        price: {
            type: Number,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        shop: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'category',
        },
        isDeleted: {
            type: Boolean,
            default: false
        },

    },
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
