const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
    getTopRatedProducts
} = require('./../../controller/productController');

const { auth, admin } = require('./../../middleware/auth');

router.route('/').get(getAllProducts);
router.route('/toprated').get(getTopRatedProducts);
router.route('/:id').get(getProductById);
router.route('/').post(auth, admin, createProduct);
router.route('/:id/update').post(auth, admin, updateProductById);
router.route('/:id').delete(auth, admin, deleteProductById);


module.exports = router;