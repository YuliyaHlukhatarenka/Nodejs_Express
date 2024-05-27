import Cart, { ICart } from "../models/cart"; 
import Product from "../models/product"; 
import { v4 as uuid } from "uuid";

export const getCart = async (userId: string) => {
  let cart;
  try {
    cart = await Cart.findOne({ userId });
    if (cart) {
      return cart;
    } else {
      try {
        const newCart = new Cart({ id: uuid(), userId });
        await newCart.save();
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

export const updateCart = async (userId: string, productId: string, newCount: number) => {
    try {
        const cart = (await Cart.findOne({ userId })) as ICart;
        if (!cart) return;
        let newItems = [...cart.items];
        const product = cart.items?.find(({ product }) => product?.id === productId);
        if (product) {
            if (newCount) {
                newItems = newItems.map(({ product, count }) => {
                  return product.id !== productId
                    ? { product, count }
                    : { product, count: newCount };
                });
            } else {
                newItems = newItems.filter(({ product }) => {
                  product?.id !== productId;
                });
            } 
        } else {
            const newProduct = await Product.findOne({ id: productId });
            newItems.push({
              product: newProduct,
              count: newCount,
            });
        }

        try {
            const result = await Cart.updateOne(
              { userId },
              { items: newItems }
            );
            console.log("Update cart", result);
            return newItems;
        } catch (err) {
            console.error("Error updating cart: ", err);
        }
    } catch (err) {
      console.error("Cart not exists", err);
    }
}

export const deleteCart = async  (userId: string) => {
  try {
    const result = await Cart.deleteOne({ userId });
    console.log("Delete cart", result);
  } catch (err) {
    console.error("Error deleting cart", err);
  }
};
