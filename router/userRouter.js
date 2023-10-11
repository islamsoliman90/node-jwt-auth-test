const express = require("express");
const userControl = require("../controlers/user");
const router = express.Router();
router.get("/login", userControl.Get_login);
router.get("/signup", userControl.Get_SignUp);
router.post("/login", userControl.post_login);
router.post("/signup", userControl.post_signUp);
router.get("/logout", userControl.Get_logout);
module.exports = router;
