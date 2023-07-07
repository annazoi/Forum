const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const postController = require("../controllers/auth");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/posts", postController.post);

module.exports = router;
