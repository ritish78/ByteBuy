const asyncHandler = require('./../middleware/asyncHandler');
const Order = require('./../models/Order');
const OrderStatus = require('./../models/OrderStatus');
const { isAdmin } = require('./../middleware/auth');

const ORDERS_PER_PAGE = 10;

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
    const currentPage = parseInt(req.query.pageNumber) || 1;
    const ordersCount = await Order.countDocuments({ user: req.user._id });

    const orders = await Order.find({ user: req.user._id })
                                .limit(ORDERS_PER_PAGE)
                                .skip((currentPage - 1) * ORDERS_PER_PAGE);
    

    return res.status(200).json({
                            orders,
                            currentPage,
                            pages: Math.ceil(ordersCount / ORDERS_PER_PAGE)
                        });
})


// @route       GET /api/orders/:id
// @desc        Get a particular order by the order id
// @access      Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    console.log(order);

    const isCurrentUserAdmin = isAdmin(req.user._id);

    if (order) {
        if (order.user._id.toString() === req.user._id.toString() || isCurrentUserAdmin) {
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

        order.paymentResult = {
            id: req.body.id,
            status: OrderStatus.PAID,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
            paidAt: Date.now()
        }

        const paidOrder = await order.save();

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
    const order = await Order.findById(req.params.id);

    if (order && order.isPaid) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        order.status = OrderStatus.DELIVERED;

        const updatedOrder = await order.save();

        return res.status(200).json(updatedOrder)
    } else {
        res.status(404);
        throw new Error('Order not found!');
    }
})


// @route       GET /api/orders/all
// @desc        Get all orders
// @access      Private - ADMIN only
const getAllOrderInfo = asyncHandler(async (req, res) => {
    const currentPage = parseInt(req.query.pageNumber) || 1;
    const ordersCount = await Order.countDocuments();
    
    const allOrders = await Order.find({})
                                    .limit(ORDERS_PER_PAGE)
                                    .skip((currentPage - 1) * ORDERS_PER_PAGE)
                                    .populate('user', 'id name');
    
    return res.status(200).json({
                            allOrders,
                            currentPage,
                            pages: Math.ceil(ordersCount / ORDERS_PER_PAGE)
                        });
})


module.exports = {
    createAnOrder,
    getAllOrdersOfCurrentUser,
    getOrderById,
    updateOrderStatusToPaid,
    updateOrderShipmentStatus,
    getAllOrderInfo
}