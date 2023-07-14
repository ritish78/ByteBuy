const asyncHandler = require('./../middleware/asyncHandler');
const User = require('./../models/User');


// @route       GET /api/auth/profile
// @desc        Get user info
// @access      Private
const getProfileOfCurrentUser = asyncHandler(async (req, res) => {
    return res.send('Profile User');
})

// @route       POST /api/auth/login
// @desc        Authenticate user and get JWT
// @access      Public
const authUser = asyncHandler(async (req, res) => {
    return res.send('Auth User');
})

module.exports = {
    getProfileOfCurrentUser,
    authUser
}