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
 *     summary: Create a new order from a cart
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartName
 *             properties:
 *               cartName:
 *                 type: string
 *                 example: "myCart1"
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: cartName missing
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */

export const NewOrder = async (req: Request, res: Response) => {
  try {
    const { cartName } = req.body;
    const orderId = uuid();

    if (!cartName) {
      return res.status(400).json({ message: "cartName is required" });
    }

    // 1. Find cart
    const cart = await Cart.findOne({ CartName: cartName });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let totalAmount = 0;

    // 2. Calculate total using Product.price
    for (const item of cart.productDet) {
      const product = await Product.findOne({ name: item.ProductName });

      if (!product) {
        return res.status(400).json({
          message: `Product ${item.ProductName} not found`,
        });
      }

      totalAmount += item.quantity * product.price;
    }

    // 3. Create order
    const order = await Order.create({
      orderId,
      cartName: cart.CartName,
      totalAmount,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

/**
 * @swagger
 * /api/orders/{orderId}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: "uuid-value"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartName:
 *                 type: string
 *               totalAmount:
 *                 type: number
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

    const order = await Order.findOneAndUpdate({ orderId }, req.body, {
      new: true,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error });
  }
};
/**
 * @swagger
 * /api/orders/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: "uuid-value"
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

export const DeleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const deleted = await Order.findOneAndDelete({ orderId });

    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error });
  }
};
