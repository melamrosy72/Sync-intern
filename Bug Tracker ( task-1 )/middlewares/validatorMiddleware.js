const { validationResult } = require('express-validator');

// @desc  Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.errors.map(error => error.msg);
        return res.status(400).json({ errors: messages });
    }
    next();
};

module.exports = validatorMiddleware;