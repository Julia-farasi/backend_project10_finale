import { Router } from "express";
import {
  createUser,
  deleteUser,
  getOneUser,
  getAllUsers,
  updateUser,
  loginUser,
} from "../controllers/user.controller.js";
// import validateUserBody from "../middlewares/validate.js"; // optional

const userRouter = Router();

userRouter.route("/").get(getAllUsers).post(createUser); // .post(validateUserBody, createUser) für Zod-Validierung
userRouter.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);
userRouter.route("/login").post(loginUser);

export default userRouter;
