const asyncHandler = require('./../middleware/asyncHandler');
const Product = require('./../models/Product');


// @route       GET /api/products
// @desc        Get all the products from MongoDB
// @access      Public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    return res.status(200).json(products);
})


// @route       GET /api/products/:id
// @desc        Get a specific product by its id
// @access      Public
const getProductById = asyncHandler(async (req, res) => {
    const productById = await Product.findById(req.params.id);

    if (productById) {
        return res.status(200).json(productById);
    } else {
        res.status(404);
        throw new Error('Product does not exists!');
    }
})


module.exports = {
    getAllProducts,
    getProductById
}