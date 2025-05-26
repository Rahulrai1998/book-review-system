import express, { Router } from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/current-user", validateToken, currentUser);

export default userRouter;
