const express = require('express');
const router = express.Router();

const {
    registerUser,
    logoutUser,
    updateUserProfile,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById
} = require('./../../controller/userController');


router.route('/').post(registerUser);
router.route('/logout').post(logoutUser);
router.route('/profile').post(updateUserProfile);
router.route('/all').get(getAllUsers);
router.route('/:userId').get(getUserById);
router.route('/:userId').delete(deleteUserById);
router.route('/:userId').post(updateUserById);

module.exports = router;