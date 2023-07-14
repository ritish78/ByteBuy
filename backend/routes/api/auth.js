const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const {
    getProfileOfCurrentUser,
    authUser
} = require('./../../controller/authController');

const { auth } = require('./../../middleware/auth');


router.route('/profile').get(auth, getProfileOfCurrentUser);
router.route('/login').post([
    check('email', 'Email is required').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists().trim()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error('Please provide email and password!');
    }

    //If the validation of email and password completes, we can continue with auth
    authUser(req, res);
});


module.exports = router;