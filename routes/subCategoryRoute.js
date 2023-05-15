const express = require("express")

const { createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory, setCategoryIdToBody } = require("../services/subCategoryService")
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require("../utils/validators/subcategoryValidator")
const { updateCategory } = require("../services/categoryService")

// mergePaarams allow us to access parameters on other routers
// ex: we need to access category id from category router
const router = express.Router({ mergeParams: true })

router.route('/')
    .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
    .get(getSubCategories)
router.route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory)
module.exports = router