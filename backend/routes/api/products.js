const express = require('express');
const Product = require('../../models/Product');
const asyncHandler = require('./../../middleware/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler (async (req, res) => {
    const products = await Product.find({});
    return res.status(200).json(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const productById = await Product.findById(req.params.id);

    if (productById) {
        return res.status(200).json(productById);
    } else {
        res.status(404);
        throw new Error('Product does not exists!');
    }
}));


module.exports = router;