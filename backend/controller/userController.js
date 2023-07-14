const asyncHandler = require('./../middleware/asyncHandler');
const User = require('./../models/User');


// @route       POST /api/users
// @desc        Register user
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
    return res.send('Register User');
})


// @route       POST /api/users/logout
// @desc        Logout user and clear cookie
// @access      Private
const logoutUser = asyncHandler(async (req, res) => {
    return res.send('Logout User');
})


// @route       POST /api/users/profile
// @desc        Update user's profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
    return res.send('Update User Profile');
})


// @route       GET /api/users
// @desc        Get all user's profile
// @access      Private - Admin Only
const getAllUsers = asyncHandler(async (req, res) => {
    return res.send('All Users');
})


// @route       GET /api/users/:userId
// @desc        Get a user's profile
// @access      Private - Admin Only
const getUserById = asyncHandler(async (req, res) => {
    return res.send('A particular user');
})

// @route       DELETE /api/users/:userId
// @desc        Get a user's profile
// @access      Private - Admin Only
const deleteUserById = asyncHandler(async (req, res) => {
    return res.send('Delete a User');
})

// @route       POST /api/users/:userId
// @desc        Update a user's profile
// @access      Private - Admin Only
const updateUserById = asyncHandler(async (req, res) => {
    return res.send('All Users');
})

module.exports = {
    registerUser,
    logoutUser,
    updateUserProfile,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById
}