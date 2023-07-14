const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const {
    registerUser,
    logoutUser,
    updateUserProfile,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById
} = require('./../../controller/userController');

const { auth, admin } = require('./../../middleware/auth');


router.route('/').post(registerUser);
router.route('/logout').post(logoutUser);
router.route('/profile').post(auth, updateUserProfile);
router.route('/all').get(getAllUsers);
router.route('/:userId').get(getUserById);
router.route('/:userId').delete(deleteUserById);
router.route('/:userId').post(updateUserById);

module.exports = router;