const { isValidObjectId } = require('mongoose');

function checkObjectId (req, res, next) {
    if (!isValidObjectId(req.params.id || req.params.userId || req.params.productId)) {
        res.status(404);
        throw new Error(`Invalid object id: ${req.params.id}`);
    }

    next();
}

module.exports = checkObjectId;