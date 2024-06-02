import { sequelize } from "./db/initDB";
import { Sequelize } from "sequelize";
import { CartFactory, CartItemFactory } from "./models/cart";
import { ProductFactory } from "./models/product";
import { OrderFactory } from "./models/order";
import { UserFactory } from "./models/user";

export const createModels = () => {
  console.log("Authenticating....");
  try {
    sequelize.authenticate();
    console.log("connection has been established successfully")
    const db = {
      sequelize,
      Sequelize,
      Cart: CartFactory(sequelize, Sequelize),
      CartItem: CartItemFactory(sequelize, Sequelize),
      Product: ProductFactory(sequelize, Sequelize),
      Order: OrderFactory(sequelize, Sequelize),
      User: UserFactory(sequelize, Sequelize),
    };

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    return db;
  } catch (err) {
    console.log("Unable to connect to DB", err);
    throw err;
  }
};