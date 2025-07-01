// routes/transaction.router.js
import { Router } from "express";
import { createTransaction } from "../controllers/transaction.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const transactionRouter = Router();

// ⛔ Nur mit gültigem Token
transactionRouter.post("/", authenticateToken, createTransaction);

export default transactionRouter;
