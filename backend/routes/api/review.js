const express = require('express');
const router = express.Router();


const {
    getAllReviews,
    getReviewById,
    getReviewsByProductId,
    getAllReviewsByOneUser,
    createReview,
    updateReviewById,
    deleteReviewById,
    deleteAllReviewsForProduct
} = require('./../../controller/reviewController');

const { auth, admin } = require('./../../middleware/auth');
const checkObjectId = require('./../../middleware/checkObjectId');

router.route('/').get(auth, admin, getAllReviews);
router.route('/:id').get(checkObjectId, getReviewById);
router.route('/product/:productId').get(checkObjectId, getReviewsByProductId);
router.route('/user/:userId').get(checkObjectId, auth, getAllReviewsByOneUser);
router.route('/:productId').post(checkObjectId, auth, createReview);
router.route('/:id/update').post(checkObjectId, auth, updateReviewById);
router.route('/:id').delete(checkObjectId, auth, deleteReviewById);
router.route('/product/:productId').delete(checkObjectId, auth, admin, deleteAllReviewsForProduct);


module.exports = router;