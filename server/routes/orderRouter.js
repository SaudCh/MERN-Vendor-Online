const express = require('express')
const { addOrder, completePayment, getOrders, getOrderById, getOrderByUser, getOrdersInfo, updateStatus } = require('../controllers/orderController')
const checkAuth = require('../middleware/checkAuth')

const router = express.Router()


router.get('/', getOrders)

router.post('/add-order', addOrder)

router.post('/confirmPayment', completePayment)

router.get('/id/:id', getOrderById)

router.get('/info', getOrdersInfo)

router.use(checkAuth)

router.patch('/status', updateStatus)

router.get('/user', getOrderByUser)



module.exports = router