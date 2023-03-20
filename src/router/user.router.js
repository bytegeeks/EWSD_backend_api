const router = require("express").Router();

const UserController = require("../controller/user.controller");

router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);

module.exports = router;
