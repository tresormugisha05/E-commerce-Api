/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing customer orders
 */
import orders from "../models/orders";
import { Request, Response } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";
import User from "../models/User";
import { v4 as uuid } from "uuid";
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
 *               customerName:
 *                 type: string
 *                  example:"tresor"
 *               ProductName:
 *                 type: string
 *                  example: "bracelets(optional if you purchased cart)"
 *               ProductAmount:
 *                 type: number
 *                  example:2
 *               cart:
 *                 type: string
 *                  example:"the cart you have created  (optional if you already a product)"
 *               CartAmount:
 *                 type: number
 *                 description: "Quantity of the cart
 *                  example:3
 *     responses:
 *       200:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                 orderResult:
 *                   type: object
 *       400:
 *         description: Invalid input or customer/product/cart not found
 *       500:
 *         description: Internal server error
 */
export const NewOrder = async (res: Response, req: Request) => {
  try {
    const orderId: string = uuid();
    const { customerName, ProductName, ProductAmount, cart, CartAmount } =
      req.body;
    const user = await User.findOne({ customerName });
    if (!user) {
      return res
        .status(400)
        .json({ Message: `we dont have a customer named ${customerName}!!` });
    }
    if (!ProductName && !cart) {
      return res
        .status(400)
        .json({ Message: "you need to input atleast one product or cart!!" });
    }
    const verifProd = await Product.findOne({ ProductName });

    if (!verifProd) {
      return res
        .status(400)
        .json({ message: `there is no product named ${ProductName}` });
    }
    if (ProductName && !ProductAmount) {
      return res.status(400).json({
        message:
          "make sure you specified the amount of our products you want!!",
      });
    }
    const verifCart = await Cart.findOne({ cart });
    if (!verifCart) {
      return res
        .status(400)
        .json({ message: `there is no cart named ${cart}` });
    }
    if (cart && !CartAmount) {
      return res.status(400).json({
        message: "please you have to specify the amount of your carts you want",
      });
    }
    const orderResult = await orders.create({
      orderId,
      customerName,
      ProductName,
      ProductAmount,
      cart,
      CartAmount,
    });
    res.status(200).json({
      Message:
        "you have placed your order successfully,it's better to save the orderId you are signed in case you need order modifications",
      orderResult,
    });
  } catch (error) {
    return res.status(500).json(error);
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *              customerName:
 *                 type: string
 *                  example:"tresor"
 *               ProductName:
 *                 type: string
 *                  example: "bracelets"
 *               ProductAmount:
 *                 type: number
 *                  example:2
 *               cart:
 *                 type: string
 *                  example:"the cart you have created"
 *               CartAmount:
 *                 type: number
 *                 description: Quantity of the cart
 *                  example:3
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const updatedOrder = await orders.findOneAndUpdate({ orderId }, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({
        message: "The order ID you entered was not found",
      });
    }

    res.status(200).json({
      message: "Order verified/updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order",
      error,
    });
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
 *                 description: The ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid or missing order ID
 *       500:
 *         description: Internal server error
 */
export const DeleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.body;
    if (!orderId) {
      return res
        .status(400)
        .json({ message: "Wrong order Id please check carefully" });
    }
    const orderVerif = await orders.findByIdAndDelete(orderId);
    res.status(200).json({
      message: "the order deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
