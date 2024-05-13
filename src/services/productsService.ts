import { products, ProductType } from '../models';

export const getProducts = async(): Promise<ProductType[]> => products;

export const getProductById = (product_id: string) =>
  products.find(({ id }) => id === product_id);
