import mongoose, { Schema } from "mongoose";
import { ICartItemEntity } from "./cart";

export type ORDER_STATUS = "created" | "completed";

export interface IOrder {
  id: string; 
  userId: string;
  cartId: string;
  items: ICartItemEntity[]; 
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const OrderSchema: Schema = new Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: Array },
  payment: { type: {} },
  delivery: { type: {} },
  comments: { type: String },
  status: { type: String },
  total: { type: Number },
});

export default mongoose.model<IOrder>("Order", OrderSchema);