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


router.route('/').get(auth, admin, getAllReviews);
router.route('/:id').get(getReviewById);
router.route('/product/:productId').get(getReviewsByProductId);
router.route('/user/:userId').get(auth, getAllReviewsByOneUser);
router.route('/:productId').post(auth, createReview);
router.route('/:id/update').post(auth, updateReviewById);
router.route('/:id').delete(auth, deleteReviewById);
router.route('/product/:productId').delete(auth, admin, deleteAllReviewsForProduct);


module.exports = router;