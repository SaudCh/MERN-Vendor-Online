const HttpError = require('../middleware/http-error')
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
    "application/pdf": "pdf",
    "application/json": "json",
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
    const isValid = !!MIME_TYPE_MAP[file.mimetype]
    let error = isValid ? null : new Error('Invalid File Type!')
    cb(error, isValid)
}

const upload = multer({ storage: storage, fileFilter: filefilter })

const uploadImages = (req, res, next) => {

    try {

        upload.array('images')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return next(new HttpError(err.message, 500))
            } else if (err) {
                return next(new HttpError(err.message, 500))
            }

            res.json({
                message: 'Images uploaded successfully',
                images: req?.files.map(file => file?.path)
            })

        })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }


}

const uploadImage = (req, res, next) => {

    try {

        upload.single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return next(new HttpError(err.message, 500))
            } else if (err) {
                return next(new HttpError(err.message, 500))
            }

            res.json({
                message: 'Image uploaded successfully',
                image: req?.file?.path
            })

        })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }


}

const updateImages = (req, res, next) => {

    // try {

    //     upload.array('images')(req, res, (err) => {
    //         if (err instanceof multer.MulterError) {
    //             return next(new HttpError(err.message, 500))
    //         } else if (err) {
    //             return next(new HttpError(err.message, 500))
    //         }

    //         res.json({
    //             message: 'Images updated successfully',
    //             images: req?.files.map(file => file?.path)
    //         })

    //     })

    // } catch (err) {
    //     const error = new HttpError(err.message, 500)
    //     return next(error)
    // }

}

module.exports = {
    uploadImages,
    uploadImage,
    updateImages
}