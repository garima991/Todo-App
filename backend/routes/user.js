const express = require("express");
const router = express.Router();

const {signUpUser, loginUser } = require("../controllers/user");



router.post("/", signUpUser);
router.post("/login", loginUser);

module.exports = router;