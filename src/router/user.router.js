const router = require("express").Router();

const UserController = require("../controller/user.controller");
const authentication = require("../utils/middleware/auth.middleware");

router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);
router.post("/get-user-count", authentication, UserController.getUserCount);
router.post("/get-user-profile", authentication, UserController.getUserProfile);
router.post("/get-all-user", authentication, UserController.getAllUser);
router.post("/get-qa-coor", authentication, UserController.getQACoordinator);
router.post("/get-qa-manager", authentication, UserController.getQAManager);
router.post("/get-staff", authentication, UserController.getStaff);
router.post("/edit-user", authentication, UserController.editUser);
router.post("/delete-user", authentication, UserController.deleteUser);

module.exports = router;
