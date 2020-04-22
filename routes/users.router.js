const express = require("express");
const router = express.Router();

// photo uploader
const upload = require("../helper/upload.helper");

// verify token
const verifyToken = require("../helper/verify-token.helper");

// user controler
const userController = require("../controllers/users.controller");

router.post("/registration", userController.registration);

router.post("/login", userController.login);

router.get("/profile", verifyToken, userController.profile);

router.post("/profile/update", verifyToken, upload.single("image"), userController.update);



module.exports = router;