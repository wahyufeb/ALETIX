const express = require("express");
const router = express.Router();

// verify token
const verifyToken = require("../helper/verify-token.helper");

// bench controller
const benchController = require("../controllers/benchs.controller");


router.post("/create", verifyToken, benchController.create);

router.post("/update/:id_bench", verifyToken, benchController.update);

router.delete("/delete/:id_bench", verifyToken, benchController.delete);


module.exports = router;