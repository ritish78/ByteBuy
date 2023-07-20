const asyncHandler = require('./../middleware/asyncHandler');
const Order = require('./../models/Order');
const OrderStatus = require('./../models/OrderStatus');


// @route       POST /api/orders
// @desc        Create a order for the user
// @access      Private
const createAnOrder = asyncHandler(async (req, res) => {
    const { 
        user,
        orderItems,
        shippingAddress,
        shippedTo,
        paymentMethod,
        paymentResult,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('Invalid order items!');
    } else {
        const order = new Order({
            user,
            orderItems: orderItems.map(item => ({
                ...item,
                product: item._id,
                image: item.images[0]
            })),
            shippingAddress,
            shippedTo,
            paymentMethod,
            paymentResult,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: false,
            paidAt: null,
            status: OrderStatus.DRAFT,
            isDelivered: false,
            deliveredAt: null
        });

        const newSavedOrder = await order.save();

        return res.status(201).json(newSavedOrder);
    }
})

// @route       GET /api/orders/mine
// @desc        Get all orders for the user
// @access      Private
const getAllOrdersOfCurrentUser = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    return res.status(200).json(orders);
})


// @route       GET /api/orders/:id
// @desc        Get a particular order by the order id
// @access      Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    console.log(order);
    if (order) {
        if (order.user._id.toString() === req.user._id.toString()) {
            return res.status(200).json(order);
        } else {
            res.status(401);
            throw new Error('User is not authorized to view this order!');
        }
    } else {
        res.status(404);
        throw new Error('Order not found!');
    }
})


// @route       POST /api/orders/:id/paid
// @desc        Update an order status to Paid by the order id
// @access      Private
const updateOrderStatusToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        console.log('Processing payment!');

        order.isPaid = true;
        order.paidAt = Date.now();
        order.status = OrderStatus.CONFIRMED;
        order.paymentResult.status = OrderStatus.PAID;
        order.paymentResult.paidAt = Date.now();
        order.paymentResult.update_time = Date.now();
        order.paymentResult.email_address = req.body.paidBy.email_address;

        const paidOrder = await order.save();
        console.log('Should return true: ', paidOrder.isPaid);

        res.status(200).json(paidOrder);
    } else {
        res.status(404);
        throw new Error('Order not found!');
    }
})

// @route       POST /api/orders/:id/shipment
// @desc        Update an order to be set as 'confirmed', 'shipped' or 'delivered' by the order id
// @access      Private - ADMIN only
const updateOrderShipmentStatus = asyncHandler(async (req, res) => {
    return res.send('Order Delivered!');
})


// @route       GET /api/orders/all
// @desc        Get all orders
// @access      Private - ADMIN only
const getAllOrderInfo = asyncHandler(async (req, res) => {
    return res.send('All Orders');
})


module.exports = {
    createAnOrder,
    getAllOrdersOfCurrentUser,
    getOrderById,
    updateOrderStatusToPaid,
    updateOrderShipmentStatus,
    getAllOrderInfo
}