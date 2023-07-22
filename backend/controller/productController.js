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


// @route       POST /api/products
// @desc        Create a product
// @access      Private - ADMIN only
const createProduct = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    console.log(userId);
    const { name, images, brand, category, description, price, countInStock } = req.body;

    const product = new Product({
        user: userId,
        name,
        images,
        brand,
        category,
        description,
        price,
        countInStock
    });


    /*
        Creating a product without anything on the req body and
        then editing the product page seems to eliminate the need
        of 'AddProductScreen.jsx' and 'EditProductScreen.jsx'.
        We can create a product with the belwo details and then
        directly redirect to the 'EditProductScreen.jsx' but for
        someone using API, they need to make two requests to
        add product to database. Not deleting the below code to
        check for later if I do so.
    */

    // const product = new Product({
    //     user: userId,
    //     name: 'Name',
    //     images: ['/images/sample.jpg'],
    //     brand: 'Brand',
    //     category: 'category',
    //     description: 'description',
    //     price: 0,
    //     countInStock: 0
    // });

    const newProduct = await product.save();

    return res.status(201).json(newProduct);
})


module.exports = {
    getAllProducts,
    getProductById,
    createProduct
}