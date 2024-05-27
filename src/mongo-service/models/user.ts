import mongoose, { Schema, Document } from "mongoose";

export interface IUser{
  id: string;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);