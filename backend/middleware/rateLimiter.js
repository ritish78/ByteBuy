const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const { redisClient } = require('../db/redis');
const MAX_REQ_ALLOWED_OF_AUTH_USER_PER_MINUTE = parseInt(process.env.MAX_REQ_ALLOWED_OF_AUTH_USER_PER_MINUTE);
const MAX_REQ_ALLOWED_OF_NOT_SIGNEDIN_PER_MINUTE = parseInt(process.env.MAX_REQ_ALLOWED_OF_NOT_SIGNEDIN_PER_MINUTE);
const WINDOW_SIZE_IN_SECONDS = parseInt(process.env.WINDOW_SIZE_IN_SECONDS);


const rateLimiter = async (req, res, next) => {
    //First, we check if the user is authorized
    let token = req.cookies.jwt;
    let userId = null;

    //Just a small token verification. If not verified, we remove the token.
    //If JWT is not verified it throws error and we set token to null.
    try {
       const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
       userId = decodedUser.user.id;
    } catch (error) {
        token = null;
    }


    let ttl;
    if (token && userId) {    
    
        const numberOfRequestByAuthorizedUser = await redisClient.incr(userId);
        
        if (numberOfRequestByAuthorizedUser === 1) {
            await redisClient.expire(userId, WINDOW_SIZE_IN_SECONDS);
            ttl = WINDOW_SIZE_IN_SECONDS;
        } else {
            ttl = await redisClient.ttl(userId);
        }
        
        res.setHeader('X-RateLimit-TTL', ttl);
        if (numberOfRequestByAuthorizedUser >= MAX_REQ_ALLOWED_OF_AUTH_USER_PER_MINUTE) {
            return res.status(429).json({ message: 'Too Many Requests! Try again later!', ttl });
        } else {
            next();
        }

    } else {
        const clientIP = req.ip;

        const numberOfRequestByNotLoggedInUser = await redisClient.incr(clientIP);

        if (numberOfRequestByNotLoggedInUser === 1) {
            await redisClient.expire(clientIP, WINDOW_SIZE_IN_SECONDS);
            ttl = WINDOW_SIZE_IN_SECONDS;
        } else {
            ttl = await redisClient.ttl(clientIP);
        }

        res.setHeader('X-RateLimit-TTL', ttl);
        if (numberOfRequestByNotLoggedInUser >= MAX_REQ_ALLOWED_OF_NOT_SIGNEDIN_PER_MINUTE) {
            return res.status(429).json({ message: 'Too Many Requests! Try again later!', ttl });
        } else {
            next();
        }
    }

}

module.exports = rateLimiter;