import express from "express";
import {
  authorizationMiddleware,
  createUserMiddleware,
  loginMiddleware,
  isAdminMiddleware,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.use(express.json());
userRouter.post(
  "/register",
  createUserMiddleware
);
userRouter.post("/login", loginMiddleware);

module.exports = userRouter;
