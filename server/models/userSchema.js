const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = mongoose.Schema

const userSchema = schema({
    name: { type: String },
    shopname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: { type: String },
    contact: { type: String },
    license: { type: String },
    website: { type: String },
    location: { type: String },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    bio: { type: String },
    role: { type: String, default: "client" },
    status: { type: String, default: "active" },
    isDeleted: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
}, {
    timestamps: true
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("user", userSchema)