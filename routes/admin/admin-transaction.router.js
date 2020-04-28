const express = require("express");
const router = express.Router();

// verify token admin
const verifyTokenAdmin = require("../../helper/verify-admin-token");
const verifyIsAdmin = require("../../helper/verify-admin-role");

// admin trnasaction controller
const adminTransactionController = require("../../controllers/admin/admin-transaction.controller")

router.get("/all-transactions", verifyTokenAdmin, verifyIsAdmin, adminTransactionController.allTransaction);

router.put("/approve/:id_transaction", verifyTokenAdmin, verifyIsAdmin, adminTransactionController.approveTransaction);

module.exports = router;