const asyncHandler = require('./../middleware/asyncHandler');
const User = require('./../models/User');
const bcrypt = require('bcrypt');
const generateJwtToken = require('./../utils/generateJwtToken');

// @route       GET /api/auth/profile
// @desc        Get user info
// @access      Private
const getProfileOfCurrentUser = asyncHandler(async (req, res) => {
    console.log('Checking profile of user id:', req.user._id);

    const user = await User.findById(req.user._id);

    if (!user) {
        console.log('User not found!');
        res.status(404);
        throw new Error('User does not exists!');
        // return res.status(404).json({ message: 'User does not exists!' });
    }

    return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        joinedAt: user.createdAt,
        dob: user.dob
    })
})

// @route       POST /api/auth/login
// @desc        Authenticate user and get JWT
// @access      Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        // res.status(400);
        // throw Error('Invalid user credentials!');
        return res.status(400).json({ message: 'Invalid user credentials!' });
    }

    //Then checking if the has of the password provided by user 
    //is same as the hashed password value saved in our database.
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        // res.status(400);
        // throw new Error('Invalid user credentials');
        return res.status(400).json({ message: 'Invalid user credentials!' });
    }

    generateJwtToken(res, user._id, user.name);

    return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        address: user.address,
        dob: user.dob 
    });
})

module.exports = {
    getProfileOfCurrentUser,
    authUser
}