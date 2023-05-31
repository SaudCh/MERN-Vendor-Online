const dotenv = require('dotenv')
dotenv.config()

const cookieSession = require('cookie-session')
const passport = require('passport')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const HttpError = require('./middleware/http-error')
const path = require('path')
const passportSetup = require('./middleware/passport')

const app = express()

app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(passport.initialize())
app.use(passport.session())


const port = process.env.PORT || 5000
const url = ""


const corsOptions = {
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL, "http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get("/", (req, res) => {
    res.send("vendor online")
})

app.use('/api/user/', require('./routes/userRouter'))
app.use('/api/category', require('./routes/categoryRouter'))
app.use('/api/product', require('./routes/productRouter'))
app.use('/api/order', require('./routes/orderRouter'))
app.use('/api/wishlist', require('./routes/wishlistRouter'))
app.use('/api', require('./routes/apiRouter'))


app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    return next(error);
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
    .connect(process.env.MONGODB_URI || url)
    .then(() => {
        app.listen(port, () => {
            console.log("App started")
        })
        console.log("Connected to Database")
    }).catch((err) => {
        console.log("Error Occured", err)
    })