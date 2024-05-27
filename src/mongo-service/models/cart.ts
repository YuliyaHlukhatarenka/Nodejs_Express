import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./product";

export interface ICartItemEntity {
  product: IProduct;
  count: number;
}

export interface ICart extends Document {
  id: string; 
  userId: string;
  isDeleted: boolean;
  items: ICartItemEntity[];
}

const CartSchema: Schema = new Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean},
  items: { type: Array, default: [] },
});

export default mongoose.model<ICart>("Cart", CartSchema);
