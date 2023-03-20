const router = require("express").Router();

const authentication = require("../utils/middleware/auth.middleware");
const DepartmentController = require("../controller/department.controller");

router.post(
    "/create-department",
    authentication,
    DepartmentController.createDepartment
);

router.post("/view-department", authentication, DepartmentController.viewDepartment);

router.post("/edit-department", authentication, DepartmentController.editDepartment);

router.post(
    "/delete-department",
    authentication,
    DepartmentController.deleteDepartment
);

module.exports = router;
