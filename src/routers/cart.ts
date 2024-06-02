import express from "express";

const cardRouter = express.Router();
import { getCart, deleteCart, updateCart } from "../controllers/cartController";
import {
  createOrder,
} from "../controllers/orderController";
import { authorizationMiddleware, isAdminMiddleware } from "../controllers/userController";

cardRouter.use(express.json());
cardRouter.get("/", authorizationMiddleware, getCart);
cardRouter.post("/checkout", createOrder);
cardRouter.put("/", updateCart);
cardRouter.delete("/", authorizationMiddleware, isAdminMiddleware, deleteCart);

module.exports = cardRouter;
