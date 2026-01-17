import mongoose, { Schema, Document } from "mongoose";
export interface Order extends Document {
    orderId:string
  customerName: string;
  ProductName?: string;
  ProductAmount: number;
  cart?: string;
  CartAmount: number;
  timeOrderPlaced: Date;
}
export interface ProdDetails extends Document {
  productName: string;
  amount: number;
}
const ProdDetailSchema = new Schema<ProdDetails>({
  productName: { type: String, required: true },
  amount: { type: Number, required: true },
});
const OrderSchema = new Schema<Order>({
    orderId:{type:String},
  customerName: { type: String, required: true },
  ProductName: { type: String, required: false },
  ProductAmount: { type: Number, required: false },
  cart: { type: String, required: false },
  CartAmount: { type: Number, required: false },
  timeOrderPlaced: { type: Date, required: false, default: Date.now },
});
export default mongoose.model<Order>("orders", OrderSchema);
