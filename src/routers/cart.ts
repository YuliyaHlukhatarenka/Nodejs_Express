import express from "express";

const cardRouter = express.Router();
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");

cardRouter.use(express.json());
cardRouter.get("/", cartController.getCart);
cardRouter.post("/checkout", orderController.createOrder);
cardRouter.put("/", cartController.updateCart);
cardRouter.delete("/", cartController.deleteCart);

module.exports = cardRouter;
