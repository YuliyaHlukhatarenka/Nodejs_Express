import express from "express";

const cardRouter = express.Router();
const cardController = require("../controllers/cardController");

cardRouter.get("/", cardController.getCard);
cardRouter.post("/checkout", cardController.createOrder);
cardRouter.put("/", cardController.updateCard);
cardRouter.delete("/", cardController.deleteCard);

module.exports = cardRouter;
