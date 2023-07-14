const jwt = require('jsonwebtoken');

const generateJWTToken = (res, userId, name) => {
    const payload = {
        user: {
            id: userId,
            name
        }
    }

    const jwtToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '604800' }
    );

    //Now setting JWT in cookie
    res.cookie('jwt', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',                         //To prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000,            //7 days
    });
}

module.exports = generateJWTToken;