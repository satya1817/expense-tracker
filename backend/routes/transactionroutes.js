const express = require("express");
const router = express.Router();

const {
  addTransaction,getTransactions,getSummary,
} = require("../controllers/transactionController");

router.post("/", addTransaction);
router.get("/", getTransactions);
router.get("/summary", getSummary);
module.exports = router;