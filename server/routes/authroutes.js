const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// router.post("/createproduct",createproduct);

module.exports = router;