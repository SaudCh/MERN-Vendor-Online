const userSchema = require('../models/userSchema')
const HttpError = require('../middleware/http-error')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require('../middleware/nodemailer')

const signup = async (req, res, next) => {

    const { email, password, name, role } = req.body
    let existingUser

    try {
        existingUser = await userSchema.find({ email })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (existingUser.length > 0) {
        const error = new HttpError('User already exists', 422)
        return next(error)
    }

    let hashedPassword

    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    const createdUser = new userSchema({
        email,
        password: hashedPassword,
        name,
        role,
        status: role == "seller" ? 'pending' : 'active'
    })

    try {
        await createdUser.save()
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    let token

    try {
        token = jwt.sign(
            { id: createdUser.id, email: createdUser.email },
            process.env.JWT_KEY,
            { expiresIn: '6h' }
        )
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({
        id: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
        isCompleted: createdUser.isCompleted,
        token
    })

}

const login = async (req, res, next) => {

    const { email, password } = req.body
    let user

    try {
        user = await userSchema.findOne({ email })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('Invalid credentials', 401)
        return next(error)
    }

    let isValidPassword = false

    try {
        isValidPassword = await bcrypt.compare(password, user.password)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!isValidPassword) {
        const error = new HttpError('Invalid credentials', 401)
        return next(error)
    }

    let token

    try {
        token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_KEY,
            { expiresIn: '6h' }
        )
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.json({ id: user.id, email: user.email, token, role: user.role, isCompleted: user.isCompleted })

}

const forgetPassword = async (req, res, next) => {

    let user
    const { email } = req.body

    if (!email) return next(new HttpError('Email Requried', 401))

    try {
        user = await userSchema.findOne({ email })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('Invalid credentials', 401)
        return next(error)
    }

    let token

    try {
        token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_KEY,
            { expiresIn: '6h' }
        )
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Email Verification',
        template: 'forgetpassword',
        context: {
            resetUrl: `http://localhost:5173/reset-password/${token}`,
            name: user.firstname,
            logoUrl: "https://picsum.photos/200/300"

        }
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Email sent: ' + info.response);
            res.status(201).json({ message: 'Please check your email' });
        }
    }
    )

}

const adminLogin = async (req, res, next) => {

    console.log(req.body)

    const { email, password } = req.body
    let user

    try {
        user = await userSchema.findOne({
            email: email
        })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('Invalid credentials', 401)
        return next(error)
    }


    if (user.role !== 'admin') {
        const error = new HttpError('You are not authorized to access this page', 401)
        return next(error)
    }

    let isValidPassword = false

    try {
        isValidPassword = await bcrypt.compare(password, user.password)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!isValidPassword) {
        const error = new HttpError('Invalid credentials', 401)
        return next(error)
    }

    let token

    try {
        token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_KEY,
            { expiresIn: '6h' }
        )
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.json({ userId: user.id, email: user.email, token })

}

const resetPassword = async (req, res, next) => {

    const { password, token } = req.body

    let decodedToken

    try {
        decodedToken = jwt.verify(token, process.env.JWT_KEY)
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!decodedToken) {
        const error = new HttpError('Invalid token', 401)
        return next(error)
    }

    let user

    try {
        user = await userSchema.findById(decodedToken.userId)
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('Invalid token', 401)
        return next(error)
    }

    let hashedPassword

    try {
        hashedPassword = await bcrypt.hash(password, 12)
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }


    try {
        await userSchema.findByIdAndUpdate(
            decodedToken.userId,
            { password: hashedPassword }
        )
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ message: 'Password reset successfully' })


}

const updateUser = async (req, res, next) => {

    let body = req.body
    let file = req?.file

    body = {
        ...body,
        status: 'active',
        isDeleted: false,
    }

    if (body?.coordinates) {
        body.coordinates = JSON.parse(body.coordinates)
    }

    if (file?.path) {
        body.avatar = file?.path
    }

    try {
        await userSchema.findByIdAndUpdate(
            req.user.id,
            body
        )
    }
    catch (err) {
        console.log(err)
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ message: 'User updated successfully' })

}

const updatePassword = async (req, res, next) => {

    const { oldPassword, newPassword } = req.body

    let user

    try {
        user = await userSchema.findById(req.user.userId)
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('Invalid token', 401)
        return next(error)
    }

    let isValidPassword = false

    try {
        isValidPassword = await bcrypt.compare(oldPassword, user.password)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!isValidPassword) {
        const error = new HttpError('Invalid credentials', 401)
        return next(error)
    }

    let hashedPassword

    try {
        hashedPassword = await bcrypt.hash(newPassword, 12)
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    try {
        await userSchema.findByIdAndUpdate(
            req.user.userId,
            { password: hashedPassword }
        )
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ message: 'Password updated successfully' })

}

const getAllUsers = async (req, res, next) => {
    let users
    try {
        users = await userSchema.find({ isDeleted: false, role: ['seller', 'client'] }, { name: 1, email: 1, role: 1, isApproved: 1, status: 1 })
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ users: users })
}

const getUserInfo = async (req, res, next) => {

    let user

    try {

        user = await userSchema.findById(req.user.id, {
            password: 0, isDeleted: 0, status: 0,
            role: 0, createdAt: 0, updatedAt: 0,
            wishlist: 0, cart: 0
        })

        if (!user) {
            const error = new HttpError('User not found', 401)
            return next(error)
        }

        res.status(201).json({ user: user })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

}

const updateStatus = async (req, res, next) => {

    const { userId, status } = req.body

    let user

    try {
        user = await userSchema.findById(userId)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('User not found', 401)
        return next(error)
    }

    try {
        await userSchema.findByIdAndUpdate(userId, req.body)
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ message: 'Status updated successfully' })

}





module.exports = {
    signup,
    login,
    forgetPassword,
    resetPassword,
    updateUser,
    updatePassword,
    getAllUsers,
    adminLogin,
    getUserInfo,
    updateStatus
}