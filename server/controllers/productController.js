const productSchema = require('../models/productSchema')
const HttpError = require('../middleware/http-error')
const userSchema = require('../models/userSchema')

const getProducts = async (req, res, next) => {

    let products

    const condition = {
        isDeleted: false
    }


    try {
        products = await productSchema.find(condition)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.json({ products: products.map(product => product.toObject({ getters: true })) })

}

const getProductById = async (req, res, next) => {

    let product

    try {
        product = await productSchema.findById(req.params.id).populate('shop').populate('category')
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!product) {
        const error = new HttpError('Could not find product', 404)
        return next(error)
    }

    res.json({ product: product.toObject({ getters: true }) })

}

const getProductByShopId = async (req, res, next) => {

    let products

    try {
        products = await productSchema.find({ shop: req.params.id })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!products) {
        const error = new HttpError('Could not find product', 404)
        return next(error)
    }

    res.json({ products: products.map(product => product.toObject({ getters: true })) })

}

const createProduct = async (req, res, next) => {

    const {
        title, price, category,
        description, shop
    } = req.body

    let user 

    try {
        user = await userSchema.findById(shop)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if(user.status === 'pending'){
        const error = new HttpError('Shop is not verified', 500)
        return next(error)
    }

    if(user.status === 'rejected'){
        const error = new HttpError('Shop is rejected', 500)
        return next(error)
    }


    if (!req.file) {
        const error = new HttpError('Image is required', 500)
        return next(error)
    }

    const image = req.file.path

    let createdProduct

    try {
        createdProduct = new productSchema({
            image,
            title,
            price,
            category,
            description,
            shop
        })

        await createdProduct.save()
    } catch (err) {
        console.log(err)
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ product: createdProduct })

}

const updateProduct = async (req, res, next) => {

    const {
        title, price, category,
        description, shop
    } = req.body

    let updatedProduct

    try {
        updatedProduct = await productSchema.findById(req.body.id)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!updatedProduct) {
        const error = new HttpError('Could not find product', 404)
        return next(error)
    }

    let body = {
        title,
        price,
        category,
        description,
        shop
    }

    if (req.file) {
        body.image = req.file.path
    }

    try {
        await productSchema.findByIdAndUpdate(req.body.id, body)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ product: updatedProduct })

}

const deleteProduct = async (req, res, next) => {

    let deletedProduct

    try {
        deletedProduct = await productSchema.findById(req.params.id)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!deletedProduct) {
        const error = new HttpError('Could not find product', 404)
        return next(error)
    }

    try {
        await productSchema.findByIdAndUpdate(req.params.id, {
            isDeleted: true
        })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Product deleted' })

}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByShopId
}