const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            /*
                We are not using the Product model as a reference to get 
                the price, title and images of the product for the user's
                order because the Product might be deleted, or the price
                might change which will results to inaccurate total price
                of the order even after the order is delivered.
            */
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Address'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: {
            type: String
        },
        status: {
            type: String,
            default: 'Confirmed'
        },
        update_time: {
            type: String
        },
        email_address: {
            type: String
        },
        paidAt: {
            type: Date,
            default: Date.now()
        }
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        requred: true,
        default: false
    },
    status: {
        type: String,
        default: 'Draft'
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
})

const Order = mongoose.Model('Order', OrderSchema);

module.exports = Order;