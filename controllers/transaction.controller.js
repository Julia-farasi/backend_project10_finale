// controllers/transaction.controller.js
import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  const { amount, is_expense, description, category, date } = req.body;
  const userId = req.user?.id;

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
