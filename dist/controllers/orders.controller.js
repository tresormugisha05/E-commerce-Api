"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrder = exports.updateOrder = exports.NewOrder = void 0;
const uuid_1 = require("uuid");
const orders_1 = __importDefault(require("../models/orders"));
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
const NewOrder = async (req, res) => {
    try {
        const { cartName } = req.body;
        const orderId = (0, uuid_1.v4)();
        if (!cartName) {
            return res.status(400).json({ message: "cartName is required" });
        }
        // 1. Find cart
        const cart = await Cart_1.default.findOne({ CartName: cartName });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        let totalAmount = 0;
        // 2. Calculate total using Product.price
        for (const item of cart.productDet) {
            const product = await Product_1.default.findOne({ name: item.ProductName });
            if (!product) {
                return res.status(400).json({
                    message: `Product ${item.ProductName} not found`,
                });
            }
            totalAmount += item.quantity * product.price;
        }
        // 3. Create order
        const order = await orders_1.default.create({
            orderId,
            cartName: cart.CartName,
            totalAmount,
        });
        res.status(201).json({
            message: "Order placed successfully",
            order,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create order", error: error.message });
    }
};
exports.NewOrder = NewOrder;
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
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orders_1.default.findOneAndUpdate({ orderId }, req.body, {
            new: true,
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({
            message: "Order updated successfully",
            order,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update order", error });
    }
};
exports.updateOrder = updateOrder;
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
const DeleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deleted = await orders_1.default.findOneAndDelete({ orderId });
        if (!deleted) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete order", error });
    }
};
exports.DeleteOrder = DeleteOrder;
