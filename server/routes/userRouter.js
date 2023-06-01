const express = require('express')
const router = express.Router()
const { signup, login, forgetPassword, getAllUsers } = require('../controllers/userController')
const { resetPassword, updateUser, updatePassword, updateStatus } = require('../controllers/userController')
const { adminLogin, getUserInfo } = require('../controllers/userController')
const checkAuth = require('../middleware/checkAuth')
const { upload } = require('../middleware/multer')


router.post('/signup', signup)
router.post('/login', login)
router.post('/a/login', adminLogin)
router.post('/forget-password', forgetPassword)
router.post('/reset-password', resetPassword)
router.patch('/update-password', updatePassword)

router.use(checkAuth)

router.get('/all', getAllUsers)

router.patch('/update-user', upload.single("image"), updateUser)

router.get('/get-user-info', getUserInfo)

router.patch('/update-status', updateStatus)



module.exports = router