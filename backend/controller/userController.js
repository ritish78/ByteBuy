const generateJWTToken = require('../utils/generateJwtToken');
const asyncHandler = require('./../middleware/asyncHandler');
const User = require('./../models/User');
const hashPassword = require('./../utils/hashPassword');


// @route       POST /api/users/signup
// @desc        Register user
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    console.log('Registering user', email);

    let user = await User.findOne({ email });

    if (user) {
        // res.status(400);
        // throw new Error('User already exists!');
        return res.status(400).json({ message: 'User already exists! Login instead!' });
    }

    //Now, checking if the password and confirmPassword is same.
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password\'s do not match!' });
    }

    const hashedPassword = await hashPassword(password);

    //Then creating the user object for our new user
    user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();

    //Now, generating JWT token if user is created succesfully.
    if (user) {
        generateJWTToken(res, user._id, name);

        return res.status(201).json({
            _id: user._id,
            name,
            email,
            isAdmin: user.isAdmin
        })
    } else {
        return res.status(500).json({ message: 'Error while creating a new user!' });
    }
})


// @route       POST /api/users/logout
// @desc        Logout user and clear cookie
// @access      Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    return res.status(200).json({ messaage: 'Logged out user succesfully' });
})


// @route       POST /api/users/profile
// @desc        Update user's profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        // res.status(404);
        // throw new Error('User does not exists!');
        return res.status(404).json({ message: 'User does not exists!' });
    }

    if (req.body.email) {
        const userByEmail = await User.findOne({ email: req.body.email })

        if (userByEmail) {
            return res.status(400).json({ message: 'User already exists with the provided email!' });
        }
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
        user.password = await hashPassword(req.body.password);
    }

    await user.save();

    return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        joinedAt: user.createdAt
    });
})


// @route       GET /api/users/all
// @desc        Get all user's profile
// @access      Private - Admin Only
const getAllUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find({});

    return res.status(200).json(allUsers);
})


// @route       GET /api/users/:userId
// @desc        Get a user's profile
// @access      Private - Admin Only
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId).select('-password');

    if (user) {
        return res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User does not exists!')
    }
})

// @route       DELETE /api/users/:userId
// @desc        Get a user's profile
// @access      Private - Admin Only
const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('User cannot delete an Admin!');
        }

        await User.deleteOne({ _id: user._id });

        return res.status(200).json({ message: 'User deleted successfully!' });
    } else {
        res.status(404);
        throw new Error('User does not exists!');
    }
})

// @route       POST /api/users/:userId
// @desc        Update a user's profile
// @access      Private - Admin Only
const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (user) {
        if (req.body.email) {
            const userByEmail = await User.findOne({ email: req.body.email })
    
            if (userByEmail) {
                return res.status(400).json({ message: 'User already exists with the provided email!' });
            }
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;

        const updatedUser = await user.save();

        return res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User does not exists!');
    }
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