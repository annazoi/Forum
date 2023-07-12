const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/", authController.getUsers);
router.get("/:id", authController.getUser);
router.delete("/:id", authController.deleteUser);

module.exports = router;
