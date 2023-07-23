const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById
} = require('./../../controller/productController');

const { auth, admin } = require('./../../middleware/auth');

router.route('/').get(getAllProducts);
router.route('/:id').get(getProductById);
router.route('/').post(auth, admin, createProduct);
router.route('/:id/update').post(auth, admin, updateProductById);


module.exports = router;