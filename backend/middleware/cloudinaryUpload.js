const dotenv = require('dotenv');
dotenv.config();
const sharp = require('sharp');

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

const cloudinaryUpload = async (req, res, next) => {
    console.log('Files', req.file);

    if (!req.file) {
        res.status(400);
        throw new Error('No pictures were uploaded!');
    }

    if (!isImage(req.file)) {
        res.status(400);
        throw new Error('Only images are allowed to be uploaded!');
    }

    const transformedBuffer = await sharp(req.file.buffer)
        .webp()
        .toBuffer();

    cloudinary.uploader.upload_stream({
        folder: 'ByteBuy',
        public_id: `${req.file.fieldname}_${Date.now()}`,
        format: 'webp',
        transformation: [
            { width: 1200, height: 1000, crop: 'pad' }
          ]
    }, async (error, result) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ error: 'Only images are allowed!' });
        }

        console.log('Image uploaded to cloudinary!');
        
        req.imageUrl = result.secure_url;
        
        next();
    }).end(transformedBuffer);
}

module.exports = cloudinaryUpload;