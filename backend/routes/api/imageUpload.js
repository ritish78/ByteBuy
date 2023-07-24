const express = require('express');
const multer = require('multer');
const path = require('path');
const cloudinaryUpload = require('./../../middleware/cloudinaryUpload');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/product/images');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        )
    }
})

const isImage = (req, file, cb) => {
    // const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    // return acceptedImageTypes.includes(file.mimetype);

    const fileTypes = /jpe?g|png|webp|gif/;
    const mimeTypes = /image\/jpe?g|image\/png|image\/webp|image\/gif/;

    const extname = fileTypes.test(path.ext(file.originalname)).toLowerCase();
    const mimeType = mimeTypes.test(file.mimeType);

    if (extname && mimeType) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed to be uploaded!'), false);
    }
}

const upload = multer({ storage, isImage });
const uploadSingleImage = upload.single('image');
const uploadMultipleImages = upload.array('images', 10)


router.post('/upload', uploadSingleImage, cloudinaryUpload, (req, res) => {
    return res.status(200).json({ imageUrl: req.imageUrl });
})

module.exports = router;