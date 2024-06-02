import { v4 as uuid } from "uuid";
import { sequelize } from "../db/initDB";

export const getProducts = async () => {
  try {
    const products = await sequelize.models.Product.findAll();
    return products;
  } catch (err) {
    console.error("Cart not exists", err);
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await sequelize.models.Product.findOne({ where: { id } });
    return product;
  } catch (err) {
    console.error("Cart not exists", err);
  }
};
