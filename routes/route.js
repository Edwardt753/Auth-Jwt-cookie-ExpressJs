const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../controller/authLogin");
const { isLogin } = require("../controller/login");
const { isRegister } = require("../controller/register");
const { adminAuth } = require("../controller/authAdminPage");
// const {
//   sendPasswordEmail,
//   changeNewPassword,
// } = require("../controller/resetPassword");

router.post("/register", isRegister);
router.post("/login", isLogin);

router.get("/dashboard", authenticateUser, adminAuth);
// router.get("/admin", adminAuth);

//RESET PASSWORD
// router.get("/admin/reset", sendPasswordEmail);
// router.get("/resetpassword", changeNewPassword);

module.exports = router;
