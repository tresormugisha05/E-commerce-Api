import mongoose,{Document,Schema} from "mongoose";
export interface OrderDetails extends Document {
    PRODUCT?:ProductDetails,
    cart?:string,
    TimeOrderFilled:Date
}
export interface ProductDetails extends Document{
    Product:String,
    amount:number
}
const orderSchema= Schema<OrderDetails>({
    
})