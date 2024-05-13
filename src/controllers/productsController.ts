import { Response, Request } from 'express';
import * as ProductsService from '../services/productsService';

export const getProducts = async (_req, res) => {
  const products = await ProductsService.getProducts();
  res.status(200).json(products);
};

export const getProductById = async (
  req: Request<{ id: string }, any, any, any>,
  res: Response
) => {
    const { id } = req.params;
    const product = await ProductsService.getProductById(id);
    res.status(200).json(product);
};