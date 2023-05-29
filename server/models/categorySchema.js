const mongoose = require("mongoose")

const schema = mongoose.Schema

const categorySchema = schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("category", categorySchema)