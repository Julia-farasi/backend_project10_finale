// routes/transaction.router.js
import { Router } from "express";
import {
  getGoals,
  createGoal,
  editGoal,
  deleteGoal,
  updateGoal,
} from "../controllers/goals.controller.js";

const goalsRouter = Router();

goalsRouter.post("/", createGoal);
goalsRouter.get("/", getGoals);
goalsRouter.put("/:id", editGoal);
goalsRouter.delete("/:id", deleteGoal);
goalsRouter.patch("/:id", updateGoal);

export default goalsRouter;
