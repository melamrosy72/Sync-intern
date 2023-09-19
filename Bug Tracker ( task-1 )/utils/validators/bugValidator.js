const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.bugValidator = [
    check('title')
        .notEmpty()
        .withMessage('title is required')
        .isLength({ min: 5 })
        .withMessage('title must be at least 5 characters'),


    check('description')
        .notEmpty()
        .withMessage('description is required')
        .isLength({ max: 200 })
        .withMessage('description could be 200 characters maximum'),

    check('priority')
        .notEmpty()
        .withMessage('priority required')
        .isIn(['top', 'mid', 'normal'])
        .withMessage('specify bug priority (top, mid, normal) '),

    validatorMiddleware,
];

