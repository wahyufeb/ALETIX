const express = require("express");
const router = express.Router();

// photo uploader
const upload = require("../../helper/upload.helper");

// verify token admin
const verifyTokenAdmin = require("../../helper/verify-admin-token");

// admin auth controler
const adminAuthController = require("../../controllers/admin/admin-auth.controller");

router.post("/registration", adminAuthController.registration);

router.post("/login", adminAuthController.login);

router.get("/profile", verifyTokenAdmin, adminAuthController.profile);

router.post("/profile/update", verifyTokenAdmin, upload.single("image"), adminAuthController.update);

module.exports = router;