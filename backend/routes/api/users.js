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


router.route('/signup').post([
    check('name', 'Name is required').not().isEmpty().trim(),
    check('email', 'Valid Email address is required').isEmail().normalizeEmail(),
    check('password', 'Please enter a password of length 8 characters or more').isLength({ min: 8 }).trim()
], (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        //If the validation of user input results in error
        res.status(400);
        throw new Error('Please provide name, email and password!');
    }

    registerUser(req, res);
});
router.route('/logout').post(auth, logoutUser);
router.route('/profile').post(auth, updateUserProfile);
router.route('/all').get(auth, admin, getAllUsers);
router.route('/:userId').get(auth, admin, getUserById);
router.route('/:userId').delete(auth, admin, deleteUserById);
router.route('/:userId').post(auth, admin, updateUserById);

module.exports = router;