import { Response, Request } from "express";
import * as CartService from "../mongo-service/services/cartService";

export const getCart = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
    const userId = req.headers["x-user-id"];
    const cart = await CartService.getCart(userId as string);
    res.status(200).json(cart);
};

export const updateCart = async (
  req: Request<any, any, {productId: string, count: number}, any>,
  res: Response
) => {
  const userId = req.headers["x-user-id"];
  const { productId, count } = req.body;
  const product = await CartService.updateCart(
    userId as string,
    productId,
    count
  );
  if (product) {
      res.status(200).json(product);
  } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Products are not valid" }));
  }
};

export const deleteCart = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const userId = req.headers["x-user-id"];
  const cart = await CartService.deleteCart(userId as string);
  res.status(200).json({ success: true });
};
