import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  oldPrice?: number;
  description?: string;
  size?: "X" | "S" | "M" | "L" | "XL" | "XXL";
  Images: string[];
  category: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  inStock: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, enum: ["X", "S", "M", "L", "XL", "XXL"] },
  oldPrice: { type: Number },
  description: { type: String },
  Images: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  inStock: { type: Boolean, default: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
