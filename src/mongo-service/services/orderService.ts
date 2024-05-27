import Cart from "../models/cart";
import Order, { IOrder } from "../models/order";
import { v4 as uuid } from "uuid";

export const createOrder = async (userId: string) => {
  let cart;
  try {
    cart = await Cart.findOne({ userId });
  } catch (err) {
    console.error("Cart not exists", err);
  }

  if (cart) {
    try {
      const newOrder = new Order({
        id: uuid(),
        userId: userId,
        cartId: cart.id,
        items: cart.items,
        payment: {},
        delivery: {},
        comments: "",
        status: "created",
        total: 1,
      } as IOrder);
      await newOrder.save();
      console.log("Order created");

      try {
        const result = await Cart.deleteOne({ userId });
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
