const userSchema = require("../models/userSchema")
const HttpError = require("../middleware/http-error")
const productSchema = require("../models/productSchema")

const toggleProduct = async (req, res, next) => {

    const { productId } = req.body
    const userId = req.user.id

    let user

    try {
        user = await userSchema.findById(userId)
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError("User not found", 404)
        return next(error)
    }

    let wishlist = user.wishlist

    const index = wishlist.indexOf(productId)

    if (index === -1) {
        wishlist.push(productId)
    }
    else {
        wishlist.splice(index, 1)
    }

    try {
        await userSchema.findByIdAndUpdate(
            userId,
            { wishlist: wishlist }
        )
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ message: "Product toggled successfully" })

}

const getWishlist = async (req, res, next) => {

    const userId = req.user.id

    let user

    try {
        user = await userSchema.findById(userId)
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError("User not found", 404)
        return next(error)
    }

    const wishlist = user.wishlist

    res.status(200).json({ wishlist: wishlist })

}

const getWishlistProducts = async (req, res, next) => {

    const userId = req.user.id

    try {
        let user = await userSchema.findById(userId)

        if (!user) {
            const error = new HttpError("User not found", 404)
            return next(error)
        }

        let wishlist = user.wishlist

        let products = []

        for (let i = 0; i < wishlist.length; i++) {
            let product = await productSchema.findOne({
                _id: wishlist[i],
                isDeleted: false
            })

            if (product) products.push(product)
        }

        res.status(200).json({ products: products })

    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

}




module.exports = {
    toggleProduct,
    getWishlist,
    getWishlistProducts
}