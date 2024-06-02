import { sequelize } from "../db/initDB";
import { v4 as uuid } from "uuid";

export const getCart = async (userId: string) => {
  let cart;
  try {
    cart = await sequelize.models.Cart.findOne({ where: { userId }});
    if (cart) {
      return cart;
    } else {
      try {
        const newCart = await sequelize.models.Cart.create({ id: uuid(), userId });
        console.log("Cart created");
        return newCart;
      } catch (err) {
        console.error("Error creating cart", err);
      }
    }
  } catch (err) {
    console.error("Cart not exists", err);
  }
};

export const updateCart = async (
  userId: string,
  productId: string,
  count: number
) => {
  try {
    const cart = await sequelize.models.Cart.findOne({ where: { userId } });
    if (!cart) return;

    if (count) {
      let product = await sequelize.models.CartItem.findOne({
        where: { cartId: userId, productId },
      });
      if (product) {
        await sequelize.models.CartItem.update({ count }, { where: { cartId: userId, productId }});
      } else {
        sequelize.models.CartItem.create({ id: uuid(), cartId: userId, productId, count});
      }
    } else {
      sequelize.models.CartItem.destroy({ where: { cartId: userId, productId } });
    }
  } catch (err) {
    console.error("Cart not exists", err);
  }
};

export const deleteCart = async (userId: string) => {
  try {
    const result = await sequelize.models.Cart.destroy({where: { userId } });
    console.log("Delete cart", result);
  } catch (err) {
    console.error("Error deleting cart", err);
  }
};
