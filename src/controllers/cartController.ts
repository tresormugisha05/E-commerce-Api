/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

import { Request, Response } from "express";
import mongoose from "mongoose";
import Cart from "../models/Cart";
import Product from "../models/Product";
import dotenv from "dotenv";
import { error } from "node:console";
dotenv.config();
/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all cart items
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: List of cart items
 *       500:
 *         description: Failed to fetch cart
 */
export const getCart = async (req: Request, res: Response) => {
  try {
    const items = await Cart.find().populate("productId");
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch" });
  }
};

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f1c2a9c1b2a123456789ab
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Product added to cart
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "incorrect Id input" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ error: "product not found" });
    }

    const newItem = new Cart({ productId, quantity: quantity || 1 });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Remove a single item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       400:
 *         description: Invalid cart ID
 *       404:
 *         description: Cart item not found
 */
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Incorrect cart Id" });
    }

    const deleted = await Cart.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "no cart found" });

    res.status(200).json({ message: "Removed successfully" });
  } catch (error: any) {
    res.status(400).json({ error: " failed to delete" });
  }
};

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Clear all items from the cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: All cart items deleted
 *       500:
 *         description: Failed to clear cart
 */
export const clearCart = async (req: Request, res: Response) => {
  try {
    await Cart.deleteMany({});
    res.status(200).json({ message: "All cart deleted" });
  } catch (error) {
    res.status(500).json({ error: "failed to delete" });
  }
};
