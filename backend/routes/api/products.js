const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct
} = require('./../../controller/productController');

const { auth, admin } = require('./../../middleware/auth');

router.route('/').get(getAllProducts);
router.route('/:id').get(getProductById);
router.route('/').post(auth, admin, createProduct);


module.exports = router;