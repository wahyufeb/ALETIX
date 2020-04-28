const express = require("express");
const router = express.Router();

// verify token admin
const verifyTokenAdmin = require("../../helper/verify-admin-token");
const verifyIsAdmin = require("../../helper/verify-admin-role");

// bench controller
const benchController = require("../../controllers/admin/admin-bench.controller");


router.get("/", verifyTokenAdmin, verifyIsAdmin, benchController.showAll)

router.post("/create", verifyTokenAdmin, verifyIsAdmin, benchController.create);

router.post("/update/:id_bench", verifyTokenAdmin, verifyIsAdmin, benchController.update);

router.delete("/delete/:id_bench", verifyTokenAdmin, verifyIsAdmin, benchController.delete);


module.exports = router;