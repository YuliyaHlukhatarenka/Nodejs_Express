import { Response, Request } from 'express';
import * as ProductsService from '../mongo-service/services/productService';

export const getProducts = async (_req, res) => {
  const products = await ProductsService.getProducts();
  res.status(200).json(products);
};

export const getProductById = async (
  req: Request<{ id: string }, any, any, any>,
  res: Response
) => {
    const { id } = req.params;
    const product = await ProductsService.getProductById(id as string);
    res.status(200).json(product);
};