const express = require('express');
const router = express.Router();

const {
    createShippingAddress,
    getAddressOfCurrentUser,
    getAddressOfUserByUserId,
    getShippingAddressById,
    updateShippingAddressById,
    deleteAddressOfCurrentUser,
    deleteAddressById,
    getAllShippingAddress
} = require('./../../controller/addressController');

const { auth, admin } = require('./../../middleware/auth');


router.route('/').post(auth, createShippingAddress);
router.route('/').get(auth, getAddressOfCurrentUser);
router.route('/all').get(auth, admin, getAllShippingAddress);
router.route('/:id').get(auth, getShippingAddressById);
router.route('/:id/user').get(auth, getAddressOfUserByUserId);
router.route('/:id/update').post(auth, updateShippingAddressById);
router.route('/').delete(auth, deleteAddressOfCurrentUser);
router.route('/:id').delete(auth, deleteAddressById);

module.exports = router;