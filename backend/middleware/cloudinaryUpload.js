const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const isImage = (file) => {
    const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

    return acceptedImageTypes.includes(file.mimetype);
}

const cloudinaryUpload = (req, res, next) => {
    console.log('Files', req.file);
    // console.log('Number of files', req.file.length);

    if (!req.file) {
        res.status(400);
        throw new Error('No pictures were uploaded!');
    }

    // const uploadedImages = [];

    // req.files.forEach((file) => {
        if (!isImage(req.file)) {
            res.status(400);
            throw new Error('Only images are allowed to be uploaded!');
        }
        console.log('Uploading images to Cloudinary!');
        console.log('File path', req.file.path);
        cloudinary.uploader.upload(
            req.file.path,
            {
                public_id: `${req.file.fieldname}_${Date.now()}`,
                // transformation: [{ width: 20000, height: 1500, crop: 'limit' }]
                transformation: [{ width: 20000, height: 1500, crop: 'scale' }]
            },
            (error, result) => {
                if (error) {
                    res.status(500);
                    throw new Error('Error while uploading picture to cloudinary!');
                }
                console.log('Image uploaded to cloudinary!');
                //Then removing the unnecssary temporary file created by multer
                fs.unlinkSync(req.file.path);

                //Then checking if all the images have been uploaded succesfully.
                // if (uploadedImages.length === req.files.length) {
                    req.imageUrl = result.secure_url;
                    next();
                // }
            }
        )
    // })
}

module.exports = cloudinaryUpload;