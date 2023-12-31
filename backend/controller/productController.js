const asyncHandler = require('./../middleware/asyncHandler');
const Product = require('./../models/Product');

const PRODUCTS_PER_PAGE = 8;

// @route       GET /api/products
// @desc        Get all the products from MongoDB
// @access      Public
const getAllProducts = asyncHandler(async (req, res) => {
    const currentPage = parseInt(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
                        ? {
                            $or: [
                                { name: { $regex: req.query.keyword, $options: 'i' } },
                                { brand: { $regex: req.query.keyword, $options: 'i' } },
                                { description: { $regex: req.query.keyword, $options: 'i' } },
                                { category: { $regex: req.query.keyword, $options: 'i' } }
                            ],
                        }
                        : {};

    const countProducts = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword })
                            .limit(PRODUCTS_PER_PAGE)
                            .skip((currentPage - 1) * PRODUCTS_PER_PAGE);
    
    return res.status(200).json({ 
                            products, 
                            currentPage,
                            pages: Math.ceil(countProducts / PRODUCTS_PER_PAGE)
                        });
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
        images: images || ['https://placehold.co/1200x1000'],
        brand,
        category,
        description,
        price,
        countInStock: parseInt(countInStock)
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



// @route       POST /api/products/:id/update
// @desc        Update a product using its id
// @access      Private - ADMIN only
const updateProductById = asyncHandler(async (req, res) => {
    const { 
        name, 
        images, 
        brand, 
        category, 
        description, 
        price, 
        countInStock,
        onSale,
        salePercentage,
        salePrice
    } = req.body;

    const userId = req.user._id;
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (product) {
        product.user = userId,
        product.name = name || product.name;
        product.images = images || product.images;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.description = description || product.description;
        product.price = price || product.price;
        product.countInStock = countInStock ? parseInt(countInStock) : product.countInStock;
        product.onSale = onSale || product.onSale;
        product.salePercentage = salePercentage || product.salePercentage;
        product.salePrice = salePrice || product.salePrice;

        const updatedProduct = await product.save();

        return res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Could not find product to update!');
    }
})


// @route       DELETE /api/products/:id
// @desc        Delete a product using its id
// @access      Private - ADMIN only
const deleteProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        return res.status(200).json({ message: 'Product deleted!' });
    } else {
        res.status(404);
        throw new Error('Could not find product to delete!');
    }
})


// @route       GET /api/products/toprated
// @desc        Get top rated products
// @access      Public
const getTopRatedProducts = asyncHandler(async (req, res) => {
    const topProducts = await Product.find({}).sort({ rating: -1 }).limit(3);

    if (topProducts) {
        return res.status(200).json(topProducts);
    } else {
        res.status(404);
        throw new Error('There are no products in database!');
    }
})


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
    getTopRatedProducts
}