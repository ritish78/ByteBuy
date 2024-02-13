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
const checkObjectId = require('./../../middleware/checkObjectId');

router.route('/').get(getAllProducts);
router.route('/toprated').get(getTopRatedProducts);
router.route('/:id').get(checkObjectId, getProductById);
router.route('/').post(auth, admin, createProduct);
router.route('/:id/update').post(checkObjectId, auth, admin, updateProductById);
router.route('/:id').delete(checkObjectId, auth, admin, deleteProductById);


module.exports = router;