const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    images: [
        {
           type: String
        }
    ],
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [
        {
            review: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'reviews'
            }
        }
    ],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    onSale: {
        type: Boolean,
        default: false
    },
    salePercentage: {
        type: Number,
        default: 0.0
    }
},{
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;