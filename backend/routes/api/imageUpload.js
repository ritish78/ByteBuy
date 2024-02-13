const express = require('express');
const multer = require('multer');
const path = require('path');
const cloudinaryUpload = require('./../../middleware/cloudinaryUpload');
const dotenv = require('dotenv');
const { error } = require('console');
dotenv.config();

const router = express.Router();

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename(req, file, cb) {
//         cb(
//             null,
//             `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//         )
//     }
// })

const storage = multer.memoryStorage();

const isImage = (req, file, cb) => {
    // const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    // return acceptedImageTypes.includes(file.mimetype);

    const fileTypes = /jpe?g|png|webp|gif/;
    const mimeTypes = /image\/jpe?g|image\/png|image\/webp|image\/gif/;

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = mimeTypes.test(file.mimetype);

    if (extname && mimeType) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
}

const upload = multer({ storage, isImage });
const uploadSingleImage = upload.single('image');
const uploadMultipleImages = upload.array('images', 10);


// router.post('/upload', uploadSingleImage, cloudinaryUpload, (req, res) => {
//     return res.status(200).json({ imageUrl: req.imageUrl });
// })

router.post('/upload', (req, res, next) => {
    uploadSingleImage(req, res, next, (err) => {
        if (err) {
            //If the uploaded file is not a picture
            return res.status(400).json({ error: 'Only images are allowed!' });
        }

        next();
    });
}, cloudinaryUpload, (req, res) => {
    return res.status(200).json({ imageUrl: req.imageUrl });
});

module.exports = router;