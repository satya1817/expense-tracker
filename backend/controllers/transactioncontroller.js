const Transaction = require("../models/Transaction");

const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);

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
    const transactions = await Transaction.find();

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
    const transactions = await Transaction.find();

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
module.exports = {
  addTransaction,getTransactions,getSummary,
};