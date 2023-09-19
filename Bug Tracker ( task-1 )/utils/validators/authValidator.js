const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.signupValidator = [
    check('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3  })
        .withMessage('username must be at least 3 characters'),


    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 3  })
        .withMessage('Password must be at least 3 characters')
        .custom((password, { req }) => {
            if (password !== req.body.password_confirm) {
                throw new Error('Password Confirmation incorrect');
            }
            return true;
        }),

    check('password_confirm')
        .notEmpty()
        .withMessage('Password confirmation required'),

    validatorMiddleware,
];

exports.loginValidator = [
    check('username')
        .notEmpty()
        .withMessage('username required'),

    check('password')
        .notEmpty()
        .withMessage('Password required'),

    validatorMiddleware,
];