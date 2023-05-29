const express = require('express')
const { upload } = require('../middleware/multer')
const {
    uploadImage,
    uploadImages,
    updateImages
} = require('../controllers/apiController')

const router = express.Router()

router.post('/image', uploadImage)
router.post('/images', uploadImages)
router.patch('/images', updateImages)

module.exports = router