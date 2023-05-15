const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const { slugify } = require('slugify');


exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid Subcategory id"),
    validatorMiddleware,

]

exports.createSubCategoryValidator = [
    check("name").notEmpty().withMessage("SubCategory required")
        .isLength({ min: 2 })
        .withMessage("Too short Subcategory name")
        .isLength({ max: 32 })
        .withMessage("Too long Subcategory name")
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true
        }),
    check("category")
        .notEmpty().withMessage("subcategory must belong to category")
        .isMongoId().withMessage("Invalid subcategory id format"),

    validatorMiddleware,
]

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid Subcategory id format"),
    body('name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validatorMiddleware,

]

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid Subcategory id format"),
    validatorMiddleware,
]