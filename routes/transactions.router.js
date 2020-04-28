const express = require("express");
const router = express.Router();

// verify token
const verifyToken = require("../helper/verify-token.helper");

// transaction controller
const transactionController = require("../controllers/transaction.controller");

// create transaction
router.post("/create", verifyToken, transactionController.createTransaction);

// get user transaction
router.get("/my-transaction", verifyToken, transactionController.myTransaction);

// get user transaction detail
router.get("/my-transaction/detail", verifyToken, transactionController.myTransactionDetail);


module.exports = router;