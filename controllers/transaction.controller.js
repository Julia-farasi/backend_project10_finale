// controllers/transaction.controller.js
import Transaction from "../models/Transaction.js";
//CREATE A NEW TRANSACTION
export const createTransaction = async (req, res) => {
  const { amount, is_expense, description, category, date } = req.body;
  const userId = req.user?.id;
  console.log("req.user in transa", userId);

  if (!userId) {
    return res.status(401).json({ message: "Nicht autorisiert" });
  }

  if (!amount || !description || typeof is_expense !== "boolean") {
    return res
      .status(400)
      .json({ message: "Pflichtfelder fehlen oder ungültig" });
  }

  try {
    const transaction = await Transaction.create({
      amount,
      is_expense,
      description,
      category,
      date,
      user_id: userId,
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error("Fehler beim Speichern:", err);
    res.status(500).json({ message: "Fehler beim Speichern" });
  }
};

//GET METHODE/ GET TRANSACTIONS
export const getTransactions = async (req, res) => {
  const userId = req.user.id;
  const limit = parseInt(req.query.limit) || 100; // z. B. limit=3

  try {
    const transactions = await Transaction.findAll({
      where: { user_id: userId },
      // order: [["date", "DESC"]],
      // limit,
      limit: parseInt(req.query.limit) || 3,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(transactions);
  } catch (err) {
    console.error("Fehler beim Laden der Transaktionen:", err);
    res.status(500).json({ message: "Fehler beim Laden" });
  }
};
////GET /transaction/income
import { Op } from "sequelize";
export const getIncomeTransactions = async (req, res) => {
  const userId = req.user.id;
  const { month } = req.query;
  try {
    const where = {
      user_id: userId,
      is_expense: false,
    };

    if (month) {
      const [year, monthStr] = month.split("-");
      const start = new Date(year, parseInt(monthStr) - 1, 1);
      const end = new Date(year, parseInt(monthStr), 0, 23, 59, 59); // letzter Tag des Monats

      where.date = {
        [Op.between]: [start, end],
      };
    }

    const income = await Transaction.findAll({
      where,
      order: [["date", "DESC"]],
    });

    res.status(200).json(income);
  } catch (err) {
    console.error("Fehler beim Laden der Einnahmen:", err);
    res.status(500).json({ message: "Fehler beim Laden der Einnahmen" });
  }
};
////GET /transaction/expense
export const getExpenseTransactions = async (req, res) => {
  const userId = req.user.id;
  const { month } = req.query;
  try {
    const where = {
      user_id: userId,
      is_expense: true,
    };

    if (month) {
      const [year, monthStr] = month.split("-");
      const start = new Date(year, parseInt(monthStr) - 1, 1);
      const end = new Date(year, parseInt(monthStr), 0, 23, 59, 59);

      where.date = {
        [Op.between]: [start, end],
      };
    }

    const expenses = await Transaction.findAll({
      where,
      order: [["date", "DESC"]],
    });

    res.status(200).json(expenses);
  } catch (err) {
    console.error("Fehler beim Laden der Ausgaben:", err);
    res.status(500).json({ message: "Fehler beim Laden der Ausgaben" });
  }
};
// In transaction.controller.js
// const transactions = await Transaction.findAll({
//   where: { user_id: req.user.id },
//   limit: parseInt(req.query.limit) || 3,
//   order: [["createdAt", "DESC"]],
// });
