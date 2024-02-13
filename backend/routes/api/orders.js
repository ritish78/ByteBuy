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
const checkObjectId = require('./../../middleware/checkObjectId');

router.route('/').post(auth, createAnOrder);
router.route('/all').get(auth, admin, getAllOrderInfo);
router.route('/mine').get(auth, getAllOrdersOfCurrentUser);
router.route('/:id').get(checkObjectId, auth, getOrderById);
router.route('/:id/paid').post(checkObjectId, auth, updateOrderStatusToPaid);
router.route('/:id/shipment').post(checkObjectId, auth, admin, updateOrderShipmentStatus);

module.exports = router;