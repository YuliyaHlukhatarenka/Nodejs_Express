import Product from "../models/product";
import { v4 as uuid } from "uuid";

export const getProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    console.error("Cart not exists", err);
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await Product.findOne({ id });
    return product;
  } catch (err) {
    console.error("Cart not exists", err);
  }
};
