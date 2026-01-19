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
import { AuthRequest } from "../models/type";
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
    const items = await Cart.find();
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
 *               - product name -cart name
 *             properties:
 *                cart name:
 *                  type:string
 *               product name:
 *                 type: string
 *                 example: straw berries
 *               quantity:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product added to cart
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { CartName, ProductName, quantity } = req.body;

    // // now TS knows req.user exists

    console.log(req.user);

    if (!ProductName || !mongoose.Types.ObjectId.isValid(ProductName)) {
      return res.status(400).json({ error: "Incorrect product Id input" });
    }

    const productExists = await Product.findById(ProductName);
    if (!productExists) {
      return res.status(404).json({ error: "Product not found" });
    }

    // create cart item with owner
    const newItem = new Cart({
      CartName,
      productDet: {
        ProductName,
        quantity: quantity || 1,
      },
      addedAt: new Date(),
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/cart/:
 *   delete:
 *     summary: Remove a single item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: product name
 *         required: true
 *         schema:
 *           type: string
 *      example:straw berries
 *         description: product name
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
    const { ProductName } = req.body;
    if (!ProductName) {
      return res.status(400).json({ error: "ProductName field is required" });
    }

    // Find and delete the whole cart that contains that product
    const deletedCart = await Cart.findOneAndDelete({
      "productDet.ProductName": ProductName,
    });

    if (!deletedCart) {
      return res
        .status(404)
        .json({ error: `No product named ${ProductName} in your cart` });
    }

    return res.status(200).json({ message: "Removed successfully" });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to delete product from your cart" });
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
    res.status(200).json({ message: "cart deleted" });
  } catch (error) {
    res.status(500).json({ error: "failed to delete" });
  }
};
