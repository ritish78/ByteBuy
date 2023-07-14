const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const User = require('./../models/User');

const auth = asyncHandler(async (req, res, next) => {
    let token;
    
    //We first check if the JWT token is present
    //Token is in the cookie if user is authorized.
    token = req.cookies.jwt;

    if (!token) {
        res.status(401);
        throw new Error('User is not authorized to perform this action!')
    }

    //Now, we then verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log({ decoded });

        req.user = await User.findById(decoded.user.id).select('-password');

        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Invalid Token! User is not authorized to perform this action!');
    }
})



const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('User is not authorized as admin to perform this action!');
    }
}

module.exports = {
    auth,
    admin
}