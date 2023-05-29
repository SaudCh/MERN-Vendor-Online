const HttpError = require('../middleware/http-error')
const orderSchema = require('../models/orderSchema')
const userSchema = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getOrders = async (req, res, next) => {

    try {
        let orders = await orderSchema.find().populate('user', 'name email phone')

        const todayOrders = await orderSchema.find({ createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } }).populate('user', 'name email phone')
        const currentMonthOrders = await orderSchema.find({ createdAt: { $gte: new Date().setDate(1) } }).populate('user', 'name email phone')
        const currentMonthDeliveredOrders = await orderSchema.find({ createdAt: { $gte: new Date().setDate(1) }, status: 'delivered' }).populate('user', 'name email phone')

        orders = orders.map(order => order.toObject({ getters: true }))

        res.json({
            orders,
            todayOrders: todayOrders.length,
            currentMonthOrders: currentMonthOrders.length,
            currentMonthDeliveredOrders: currentMonthDeliveredOrders.length
        })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

}

const getOrderById = async (req, res, next) => {

    try {
        const { id } = req.params

        const order = await orderSchema.findById(id).populate('user', 'name email phone')

        res.json({ order: order.toObject({ getters: true }) })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

}

const getOrderByUser = async (req, res, next) => {

    try {
        const { id } = req.user

        const orders = await orderSchema.find({ user: id }).populate('user', 'name email phone')

        res.json({ orders: orders.map(order => order.toObject({ getters: true })) })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

}

const addOrder = async (req, res, next) => {

    try {
        const { cart, total, discount, coupon, user, payment, userId } = req.body

        let uid;

        if (!userId) {

            let existingUser = await userSchema.findOne({ email: user.email })

            if (existingUser) {

                uid = existingUser._id

            } else {

                const password = Math.random().toString(36).slice(-8)

                const hashedPassword = await bcrypt.hash(password, 12)

                const newUser = new userSchema({
                    firstname: user.firstname,
                    lastname: user.lastname || '',
                    email: user.email,
                    password: hashedPassword
                })

                await newUser.save()

                uid = newUser._id
            }

        } else {
            uid = userId
        }

        if (user?.saveInfo) {
            const userInfo = {
                firstname: user.firstname,
                lastname: user.lastname || '',
                phone: user.phone,
                contactMail: user.contactMail,
                address: user.address,
                city: user.city,
                country: user.country,
            }

            await userSchema.findByIdAndUpdate(uid, userInfo)
        }


        const userInfo = {
            firstname: user.firstname,
            lastname: user.lastname || '',
            email: user.email,
            phone: user.phone,
            contactMail: user.contactMail,
        }

        const products = cart.map(item => {
            return item._id
        })

        let paymentInfo = {}

        if (payment === 'card') {
            // stripe payment
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total * 100,
                currency: "pkr",
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            console.log(paymentIntent)

            paymentInfo = {
                paymentId: paymentIntent.id,
                paymentStatus: paymentIntent.status,
                paymentAmount: paymentIntent.amount,
                paymentCurrency: paymentIntent.currency,
                clientSecret: paymentIntent.client_secret,
            }

        }

        // orderId = Math.random().toString(36).slice(-10)

        const order = new orderSchema({
            orderId: Math.random().toString(36).slice(-10),
            products,
            total,
            discount,
            coupon,
            payment,
            userInfo,
            cart,
            address: user.address,
            city: user.city,
            country: user.country,
            note: user.note,
            info: user.extraInfo,
            user: uid,
            paymentInfo
        })

        await order.save()

        // console.log(order)

        res.json({ message: 'Order Added', order })

    } catch (error) {
        const err = new HttpError(error.message, 500)
        return next(err)
    }

}

const completePayment = async (req, res, next) => {

    try {
        const payload = req.body

        const sig = req.headers['stripe-signature'];

        let event;

        const payloadString = JSON.stringify(payload, null, 2);

        const secret = process.env.STRIPE_SIGNING_SECRET;

        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });

        try {

            event = stripe.webhooks.constructEvent(payloadString, header, process.env.STRIPE_SIGNING_SECRET);

        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message} `);
        }

        let paymentIntent = null;
        switch (event.type) {
            case "payment_intent.created":
                paymentIntent = event.data.object;
                console.log("Payment Intent Created", paymentIntent);
                break;
            case "payment_intent.succeeded":
                paymentIntent = event.data.object;

                console.log("Payment Intent Succeeded", paymentIntent.id);

                const order = await orderSchema.findOne({ 'paymentInfo.paymentId': paymentIntent?.id })

                if (!order) {
                    const error = new HttpError('Order not found', 404)
                    return next(error)
                }

                await orderSchema.updateOne({ 'paymentInfo.paymentId': paymentIntent?.id }, { 'paymentInfo.paymentStatus': paymentIntent?.status, paymentStatus: paymentIntent?.status })
                break;
            case "payment_intent.canceled":
                paymentIntent = event.data.object;
                console.log("Payment Intent Cancelled", paymentIntent.id);
                break;
            default:
                console.log("Unhandled event type", event.type);
                break;
        }

        res.json({ message: 'Process Completed' })

    } catch (error) {
        const err = new HttpError(error.message, 500)
        return next(err)
    }

}

const getOrdersInfo = async (req, res, next) => {

    try {
        const orders = await orderSchema.find({}).populate('user', 'name email phone')

        // last 7 days orders with status delivered
        const last7DaysOrders = await orderSchema.find({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, status: 'delivered' }).populate('user', 'name email phone')

        // [
        // [order1,order2], 
        //     [order1,order2],
        // ]



        console.log(payment)


        res.json({
            orders
        })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

}

const updateStatus = async (req, res, next) => {

    try {
        const { status, id } = req.body

        const order = await orderSchema.findById(id)

        if (!order) {
            const error = new HttpError('Order not found', 404)
            return next(error)
        }

        await orderSchema.findByIdAndUpdate(id, { status })

        res.json({ message: 'Status Updated' })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

}



module.exports = {
    addOrder,
    completePayment,
    getOrders,
    getOrderById,
    getOrderByUser,
    getOrdersInfo,
    updateStatus
}