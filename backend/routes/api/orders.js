const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const {
    createAnOrder,
    getAllOrdersOfCurrentUser,
    getOrderById,
    updateOrderStatusToPaid,
    updateOrderShipmentStatus,
    getAllOrderInfo
} = require('./../../controller/orderController');

const { auth, admin } = require('./../../middleware/auth');


router.route('/').post(auth, createAnOrder);
router.route('/all').get(auth, admin, getAllOrderInfo);
router.route('/mine').get(auth, getAllOrdersOfCurrentUser);
router.route('/:id').get(auth, getOrderById);
router.route('/:id/paid').post(auth, admin, updateOrderStatusToPaid);
router.route('/:id/shipment').post(auth, admin, updateOrderShipmentStatus);

module.exports = router;