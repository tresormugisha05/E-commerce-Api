import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  inStock: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  inStock: { type: Boolean, default: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
