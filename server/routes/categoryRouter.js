const express = require('express')
const router = express.Router()
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController')
const { upload } = require('../middleware/multer')

// get all cateogry
router.get('/', getCategories)
// get category by id
router.get('/:id', getCategoryById)
// create category
router.post('/', upload.single('image'), createCategory)
// update category
router.patch('/', upload.single('image'), updateCategory)
// delete category
router.delete('/:id', deleteCategory)

module.exports = router