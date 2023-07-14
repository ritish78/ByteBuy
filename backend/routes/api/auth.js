const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const {
    getProfileOfCurrentUser,
    authUser
} = require('./../../controller/authController');


router.route('/profile').get(getProfileOfCurrentUser);
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
router.route('/test').post(authUser);

module.exports = router;