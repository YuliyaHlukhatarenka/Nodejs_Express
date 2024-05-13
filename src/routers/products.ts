import express from "express";

const productsRouter = express.Router();
const productsController = require("../controllers/productsController");

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:id", productsController.getProductById);

module.exports = productsRouter;
