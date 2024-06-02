import { Response, Request } from "express";
import * as OrderService from "../postgres/services/orderService";

export const createOrder = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const id = req.headers["x-user-id"];
  const cart = await OrderService.createOrder(id as string);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Cart is empty" }));
  }
};
