import { Response, Request } from "express";
import * as CardService from "../services/cardService";

export const getCard = async (
  req: Request<any, any, any, { id: string }>,
  res: Response
) => {
    const { id } =  req.query;
    const card = await CardService.getCard(id);
    res.status(200).json(card);
};

export const updateCard = async (
  req: Request<any, any, {productId: string, count: number}, { id: string }>,
  res: Response
) => {
  const { id } = req.query;
  const { productId, count } = req.body;
  const product = await CardService.updateCard(id, productId, count);
  if (product) {
      res.status(200).json(product);
  } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Products are not valid" }));
  }
};

export const deleteCard = async (
  req: Request<any, any, any, { id: string }>,
  res: Response
) => {
  const { id } = req.query;
  const card = await CardService.deleteCard(id);
  res.status(200).json({ success: true });
};

export const createOrder = async (
  req: Request<any, any, any, { id: string }>,
  res: Response
) => {
  const { id } = req.query;
  const card = await CardService.createOrder(id);
  if (card) {
      res.status(200).json(card);
  } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Cart is empty" }));
  }
};
