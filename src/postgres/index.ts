import { sequelize } from "./db/initDB";
import { Sequelize } from "sequelize";
import { CartFactory, CartItemFactory } from "./models/cart";
import { ProductFactory } from "./models/product";
import { OrderFactory } from "./models/order";

export const createModels = () => {
  const db = {
    sequelize,
    Sequelize,
    Cart: CartFactory(sequelize, Sequelize),
    CartItem: CartItemFactory(sequelize, Sequelize),
    Product: ProductFactory(sequelize, Sequelize),
    Order: OrderFactory(sequelize, Sequelize),
  };

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};