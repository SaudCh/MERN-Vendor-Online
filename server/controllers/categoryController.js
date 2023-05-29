const categorySchema = require('../models/categorySchema')
const HttpError = require('../middleware/http-error')

const getCategories = async (req, res, next) => {

    let categories

    try {
        categories = await categorySchema.find()
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.json({ categories: categories.map(category => category.toObject({ getters: true })) })

}

const getCategoryById = async (req, res, next) => {

    let category

    try {
        category = await categorySchema.findById(req.params.id)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!category) {
        const error = new HttpError('Could not find category', 404)
        return next(error)
    }

    res.json({ category: category.toObject({ getters: true }) })

}

const createCategory = async (req, res, next) => {

    const { name } = req.body
    const file = req?.file

    let createdCategory

    try {

        createdCategory = new categorySchema({
            name,
            image: file?.path
        })

        await createdCategory.save()
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ category: createdCategory })

}

const updateCategory = async (req, res, next) => {

    const { name, id } = req.body
    const file = req?.file

    let body = {
        name
    }

    if (file) {
        body = {
            name,
            image: file?.path
        }
    }

    let category

    try {
        category = await categorySchema.findById(id)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!category) {
        const error = new HttpError('Could not find category', 404)
        return next(error)
    }

    try {
        await categorySchema.findByIdAndUpdate(id, body)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ category: category.toObject({ getters: true }) })

}

const deleteCategory = async (req, res, next) => {
    const { id } = req.params

    let category

    try {
        category = await categorySchema.findById(id)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!category) {
        const error = new HttpError('Could not find category', 404)
        return next(error)
    }

    try {
        await categorySchema.findByIdAndDelete(id)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Category deleted' })
}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}