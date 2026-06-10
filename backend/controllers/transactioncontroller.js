const Transaction = require("../models/transaction");

const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
  ...req.body,
  user: req.user.id,
});

    res.status(201).json({
      success: true,
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
    user: req.user.id,
  });

    res.json({
      success: true,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
  user: req.user.id,
});

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    res.json({
      success: true,
      totalIncome,
      totalExpense,
      balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateTransaction = async (req, res) => {
  try {
    const transaction =
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addTransaction,getTransactions,getSummary,deleteTransaction,updateTransaction,
};