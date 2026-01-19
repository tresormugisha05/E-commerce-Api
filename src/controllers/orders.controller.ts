/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing customer orders
 */
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import Order from "../models/orders";
import Cart from "../models/Cart";
import Product from "../models/Product";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *             properties:
 *               cart name:
 *                 type: string
 *                 example: "the cart you have created"
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid input or customer/product/cart not found
 *       500:
 *         description: Internal server error
 */
export const NewOrder = async (req: Request, res: Response) => {
  try {
    const { CartName } = req.body;

    if (!CartName) {
      return res.status(400).json({ message: "Provide CartName!" });
    }

    // 1️⃣ Find cart
    const cart = await Cart.findOne({ CartName });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // 2️⃣ Calculate total
    let CartTot = 0;

    const product = await Product.findOne({
      ProductName: cart.productDet.ProductName,
    });

    if (!product) {
      return res.status(404).json({
        message: `Product ${cart.productDet.ProductName} not found`,
      });
    }

    CartTot += product.price * cart.productDet.quantity;

    // 3️⃣ Create order
    const orderResult = await Order.create({
      orderId: uuid(),
      cartName: CartName,
      totalAmount: CartTot,
      timeOrderPlaced: new Date(),
    });

    res.status(201).json({
      message: "Order placed successfully. Save your orderId.",
      orderResult,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
};

/**
 * @swagger
 * /api/orders/{orderId}:
 *   put:
 *     summary: Update an existing order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The UUID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: "tresor"
 *               ProductName:
 *                 type: string
 *                 example: "bracelets"
 *               ProductAmount:
 *                 type: number
 *                 example: 2
 *               cart:
 *                 type: string
 *                 example: "the cart you have created"
 *               CartAmount:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await Order.findOneAndUpdate({ orderId }, req.body, {
      new: true,
    });

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found." });

    res
      .status(200)
      .json({ message: "Order updated successfully.", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order.", error });
  }
};

/**
 * @swagger
 * /api/orders:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "uuid-of-order"
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Invalid or missing order ID
 *       500:x
 *         description: Internal server error
 */
export const DeleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    if (!orderId)
      return res.status(400).json({ message: "orderId is required." });

    await Order.findOneAndDelete({ orderId });

    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    res.status(500).json({ error });
  }
};
