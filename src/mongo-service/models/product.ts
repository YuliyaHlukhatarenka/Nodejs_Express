import mongoose, { Schema, Document } from "mongoose";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
}

const ProductSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  price: { type: Number },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
