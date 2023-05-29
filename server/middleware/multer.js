const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require("uuid");

const MIME_TYPE_MAP = {
    'image/png': "png",
    'image/jpeg': "jpeg",
    'image/jpg': 'jpg',
    'image/svg+xml': 'svg+xml',
    'image/gif': 'gif',
    'file/json': 'json',
    "application/pdf": "pdf"
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + file.originalname)
    }
})

const filefilter = (req, file, cb) => {
    console.log(file.mimetype)
    const isValid = !!MIME_TYPE_MAP[file.mimetype]
    let error = isValid ? null : new Error('Invalid File Type!')
    cb(error, isValid)
}

const upload = multer({ storage: storage, fileFilter: filefilter })

module.exports = { upload }

