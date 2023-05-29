const express = require('express')
const { getProducts,
    getProductById,
    getProductByShopId,
    createProduct,
    updateProduct,
    deleteProduct } = require('../controllers/productController')
const { upload } = require('../middleware/multer')

const router = express.Router()

router.get('/', getProducts)
router.get('/s/:id', getProductByShopId)
router.get('/:id', getProductById)
router.post('/', upload.single("image"), createProduct)
router.patch('/', upload.single("image"), updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router