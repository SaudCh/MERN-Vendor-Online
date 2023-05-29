const express = require('express')
const router = express.Router()
const { toggleProduct, getWishlist, getWishlistProducts } = require('../controllers/wishlistController')
const checkAuth = require('../middleware/checkAuth')


router.use(checkAuth)
// router.use(restrictTo('patient'))
router.get('/get-wishlist', getWishlist)
router.post('/toggle-product', toggleProduct)
router.get('/get-wishlist-products', getWishlistProducts)



module.exports = router