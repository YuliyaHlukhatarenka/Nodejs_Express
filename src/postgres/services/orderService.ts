import { sequelize } from "../db/initDB";
import { v4 as uuid } from "uuid";

export const createOrder = async (userId: string) => {
  let cart;
  try {
    cart = await sequelize.models.Cart.findOne({ where: { userId }});
  } catch (err) {
    console.error("Cart not exists", err);
  }

  if (cart) {
    try {
      const newOrder = await sequelize.models.Order.create({
        id: uuid(),
        userId: userId,
        cartId: cart.id,
        items: cart.items,
        payment: {},
        delivery: {},
        comments: "",
        status: "created",
        total: 1,
      });
      await newOrder.save();
      console.log("Order created");

      try {
        const result = await sequelize.models.Cart.destroy({ where: { userId }});
        console.log("Delete cart", result);
      } catch (err) {
        console.error("Error deleting cart", err);
      }
      return newOrder;
    } catch (err) {
      console.error("Error creating order", err);
    }
  }
};
