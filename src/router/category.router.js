const router = require("express").Router();

const authentication = require("../utils/middleware/auth.middleware");
const CategoryController = require("../controller/category.controller");

router.post(
    "/create-category",
    authentication,
    CategoryController.createCategory
);

router.post("/view-category", authentication, CategoryController.viewCategory);

router.post("/edit-category", authentication, CategoryController.editCategory);

router.post(
    "/delete-category",
    authentication,
    CategoryController.deleteCategory
);

module.exports = router;
