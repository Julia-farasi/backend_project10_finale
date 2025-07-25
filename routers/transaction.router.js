// routes/transaction.router.js
import { Router } from "express";
import {
  getTransactions,
  createTransaction,
  getIncomeTransactions,
  getExpenseTransactions,
  deleteTransaction,
  getMonthlySummary,
} from "../controllers/transaction.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const transactionRouter = Router();

// ⛔ Nur mit gültigem Token
transactionRouter.post("/", authenticateToken, createTransaction);
transactionRouter.get("/", authenticateToken, getTransactions);
transactionRouter.get("/income", authenticateToken, getIncomeTransactions);
transactionRouter.get("/expense", authenticateToken, getExpenseTransactions);
transactionRouter.delete("/:id", authenticateToken, deleteTransaction);
transactionRouter.get("/monthly-summary", authenticateToken, getMonthlySummary);

export default transactionRouter;
