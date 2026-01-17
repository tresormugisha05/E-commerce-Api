import Router from "express"
import { NewOrder,updateOrder,DeleteOrder } from "../controllers/orders.controller"
const app =Router()
app.post("/",NewOrder)
app.put("/",updateOrder)
app.delete("/",DeleteOrder)
export default app