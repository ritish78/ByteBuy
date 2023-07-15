const { check, validationResult } = require('express-validator');

const authValidationRules = [
    check('email', 'Email is required').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists().trim()
]

const validateEmailPassword = () => {
    return async (req, res, next) => {
        await Promise.all(authValidationRules.map(validation => validation.run(req)));

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error('Please provide email and password!');
        }

        next();
    }
}

module.exports = validateEmailPassword;