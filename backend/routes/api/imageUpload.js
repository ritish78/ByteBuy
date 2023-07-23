const express = require('express');
const multer = require('multer');
const cloudinaryUpload = require('./../../middleware/cloudinaryUpload');

const router = express.Router();

const upload = multer({ dest: 'uploads/images/products/' });


router.post('/upload', upload.array('photos', 10), cloudinaryUpload, (req, res) => {
    return res.status(200).json({ imageUrl: req.imageUrls });
})

module.exports = router;