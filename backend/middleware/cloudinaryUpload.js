const multer = require('multer');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET
});


const upload = multer({ dest: 'uploads/images/products/' });


const isImage = (file) => {
    const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

    return acceptedImageTypes.includes(file.mimetype);
}

const cloudinaryUpload = (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error('No pictures were uploaded!');
    }

    const uploadedImages = [];

    req.files.forEach((file) => {
        if (!isImage(file)) {
            res.status(400);
            throw new Error('Only images are allowed to be uploaded!');
        }

        cloudinary.uploader.upload(
            file.path,
            {
                public_id: `${file.fieldname}_${Date.now()}`,
                transformation: [{ width: 1500, height: 1500, crop: 'limit' }]
            },
            (error, result) => {
                if (error) {
                    res.status(500);
                    throw new Error('Error while uploading picture to cloudinary!');
                }

                //Then removing the unnecssary temporary file created by multer
                fs.unlinkSync(file.path);

                //Then adding the URL of the uploaded images to the array
                uploadedImages.push(result.secure_url);

                //Then checking if all the images have been uploaded succesfully.
                if (uploadedImages.length === req.files.length) {
                    req.imageUrls = uploadedImages;
                    next();
                }
            }
        )
    })
}

module.exports = cloudinaryUpload;