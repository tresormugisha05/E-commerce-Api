import mongoose, { Schema, Document } from "mongoose";
export interface Order extends Document {
    orderId:string
  cartName: string;
  totalAmount:number;
  timeOrderPlaced: Date;
}
const OrderSchema = new Schema<Order>({
    orderId:{type:String},
  cartName: { type: String, required: true },
  totalAmount:{type:Number},
  timeOrderPlaced: { type: Date, required: false, default: Date.now },
});
export default mongoose.model<Order>("orders", OrderSchema);
