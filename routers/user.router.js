import { Router } from "express";
import {
  createUser,
  deleteUser,
  getOneUser,
  getAllUsers,
  updateUser,
  loginUser,
  logout,
  getUserProfile,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
// import validateUserBody from "../middlewares/validate.js"; // optional

const userRouter = Router();
userRouter.route("/me", authenticateToken).get(getUserProfile);

userRouter.route("/").get(getAllUsers).post(createUser); // .post(validateUserBody, createUser) für Zod-Validierung
userRouter.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logout);

export default userRouter;
