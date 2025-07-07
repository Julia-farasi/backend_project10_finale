// routes/transaction.router.js
import { Router } from "express";
import {
  getGoals,
  createGoal,
  editGoal,
  deleteGoal,
} from "../controllers/goals.controller.js";

const goalsRouter = Router();

goalsRouter.post("/", createGoal);
goalsRouter.get("/", getGoals);
goalsRouter.put("/:id", editGoal);
goalsRouter.delete("/:id", deleteGoal);

export default goalsRouter;
