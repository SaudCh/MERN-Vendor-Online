const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    userInfo: {
        type: Object,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    total: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    coupon: {
        type: String,
    },
    status: {
        type: String,
        default: "pending"
    },
    payment: {
        type: String,
        default: "cash"
    },
    paymentStatus:{
        type: String,
        default: "pending"
    },
    paymentInfo: {
        type: Object,
    },
    cart: [Object],
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    note: {
        type: String,
    },
    info: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("order", orderSchema);
