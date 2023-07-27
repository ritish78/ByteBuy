const asyncHandler = require('./../middleware/asyncHandler');
const Review = require('./../models/Review');
const Product = require('./../models/Product');
const User = require('./../models/User');


// @route       GET /api/reviews
// @desc        Get all reviews
// @access      Private - ADMIN only
const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({});
    return res.status(200).json(reviews);
})


// @route       GET /api/reviews/:id
// @desc        Get a specific review by its id
// @access      Public
const getReviewById = asyncHandler(async (req, res) => {
    const reviewById = await Review.findById(req.params.id);

    if (reviewById) {
        return res.status(200).json(reviewById);
    } else {
        res.status(404);
        throw new Error('Review does not exists!');
    }
})


// @route       GET /api/reviews/product/:productId
// @desc        Get all reviews for a product
// @access      Public
const getReviewsByProductId = asyncHandler(async (req, res) => {
    const productById = await Product.findById(req.params.productId);

    if (productById) {
        const reviews = await Review.find({ product: req.params.productId });

        return res.status(200).json(reviews);
    } else {
        res.status(404);
        throw new Error('Product does not exists to load its review!');
    }
})


// @route       GET /api/reviews/user/:userId
// @desc        Get all reviews created by a user
// @access      Private and ADMIN
const getAllReviewsByOneUser = asyncHandler(async (req, res) => {
    const userById = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user._id);

    if (userById) {
        if (userById._id.toString() === currentUser._id.toString() || currentUser.isAdmin) {
            const reviews = await Review.find({ user: req.params.userId });
    
            return res.status(200).json(reviews);
        } else{
            res.status(403);
            throw new Error('You are not authorized to view reviews of this user!');
        }
    } else {
        res.status(404);
        throw new Error('User does not exists!');
    }
})



// @route       POST /api/reviews/:productId
// @desc        Create a review
// @access      Private
const createReview = asyncHandler(async (req, res) => {
    const productById = await Product.findById(req.params.productId);
    const { rating, comment } = req.body;

    if (Number(rating) < 0.5 || Number(rating) > 5) {
        res.status(400);
        throw new Error('Invalid review rating!');
    }

    if (productById) {
        const hasCurrentUserReviewed = productById.reviews.find(reviewer => reviewer.user._id.toString() === req.user._id.toString());

        if (hasCurrentUserReviewed) {
            res.status(400);
            throw new Error('User has already reviewed the product!');
        }

        //In 'Review' model, we are also storing the username, so we need
        //to get the currentuser to store it in the review.
        //We could also use req.user.name without another db call.
        const currentUser = await User.findById(req.user._id);

        const review = new Review({
            product: productById._id,
            name: currentUser.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        });

        await review.save();

        //After we create review, we are adding the Review and User IDs as 
        //a foreign key in current Product.
        productById.reviews.unshift({ review: review._id, user: currentUser._id });

        productById.numberOfReviews = productById.reviews.length;

        const reviews = await Review.find({ product: productById._id });
        productById.rating = reviews.reduce((accumulator, review) => accumulator + review.rating, 0)
                                / productById.numberOfReviews;

        await productById.save();

        return res.status(201).json(review);
    } else {
        res.status(404);
        throw new Error('Product does not exists to create a review!');
    }
})


// @route       POST /api/reviews/:id/update
// @desc        Update a review
// @access      Private
const updateReviewById = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    const { rating, comment } = req.body;

    if (Number(rating) < 0.5 || Number(rating) > 5) {
        res.status(400);
        throw new Error('Invalid review rating!');
    }

    if (!review) {
        res.status(404);
        throw new Error('Review not found!');
    }

    const currentUser = await User.findById(req.user._id);
    
    if ((review.user.toString() !== currentUser._id.toString()) && !currentUser.isAdmin) {
        res.status(403);
        throw new Error('Current user is not authorized to update this review!');
    }
    
    if (review.rating === rating) {
        //Finally updating the review
        //If review rating does not change we don't need to modify Product`
        review.comment = comment;
        await review.save();
    } else {
        //After we update the review, we need to update the Product
        //as well as the rating value changes.
        review.rating = Number(rating);
        review.comment = comment;

        await review.save();

        const productById = await Product.findById(review.product);

        const reviews = await Review.find({ product: productById._id });
        productById.rating = reviews.reduce((accumulator, review) => accumulator + review.rating, 0)
                                / productById.numberOfReviews;

        await productById.save();
    }

    return res.status(200).json({ message: 'Review updated!' });
})


// @route       DELETE /api/reviews/:id
// @desc        Delete a review by its id
// @access      Private or ADMIN
const deleteReviewById = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        res.status(404);
        throw new Error('Review does not exists!');
    }

    const currentUser = await User.findById(req.user._id)

    if ((review.user.toString() !== currentUser._id.toString()) && !currentUser.isAdmin) {
        res.status(403);
        throw new Error('Current user is not authorized to delete this review!');
    }
    
    const productById = await Product.findById(review.product);
    await Review.deleteOne({ _id: review._id });

    const allOtherReviews = await Review.find({ product: productById._id });

    const remainingReviews = productById.reviews.filter(review => review.user.toString() !== currentUser._id.toString());
    productById.rating = allOtherReviews.reduce((accumulator, review) => accumulator + review.rating, 0)
                                / (remainingReviews.length);

    productById.reviews = remainingReviews;
    productById.numberOfReviews = remainingReviews.length;

    await productById.save();

    return res.status(200).json({ message: 'Review deleted!' });
})


// @route       DELETE /api/reviews/product/:productId
// @desc        Delete a review by its id
// @access      Private - ADMIN only
const deleteAllReviewsForProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404);
        throw new Error('Product does not exists!');
    }

    await Review.deleteMany({ product: product._id });

    product.numberOfReviews = 0;
    product.reviews = [];
    product.rating = 0;

    await product.save();

    return res.status(200).json({ message: 'All reviews deleted!' });
})




module.exports = {
    getAllReviews,
    getReviewById,
    getReviewsByProductId,
    getAllReviewsByOneUser,
    createReview,
    updateReviewById,
    deleteReviewById,
    deleteAllReviewsForProduct
}