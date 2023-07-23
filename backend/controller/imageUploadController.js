const asyncHandler = require('../middleware/asyncHandler');
const cloudinaryUpload = require('../middleware/cloudinaryUpload');

// @route       POST /api/image/upload
// @desc        Create an address for the user
// @access      Private
const addProductImages = asyncHandler(async (req, res) => {
    cloudinaryUpload(req, res, next);
})

module.exports = addProductImages;