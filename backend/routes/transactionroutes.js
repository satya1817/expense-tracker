const express = require("express");
const router = express.Router();
const protect = require("../middleware/authmiddleware");
const {
  addTransaction,getTransactions,getSummary,deleteTransaction,updateTransaction
} = require("../controllers/transactioncontroller");

router.post("/",protect, addTransaction);
router.get("/", protect,getTransactions);
router.get("/summary",protect, getSummary);
router.delete("/:id",protect, deleteTransaction);
router.put("/:id",protect, updateTransaction);
module.exports = router;