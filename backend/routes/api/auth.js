const express = require('express');
const router = express.Router();

const {
    getProfileOfCurrentUser,
    authUser
} = require('./../../controller/authController');


router.route('/profile').get(getProfileOfCurrentUser);
router.route('/login').post(authUser);