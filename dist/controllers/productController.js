"use strict";
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("../models/Product"));
const Categories_1 = __importDefault(require("../models/Categories"));
const dotenv_1 = __importDefault(require("dotenv"));
const claudinary_config_1 = __importDefault(require("../config/claudinary.config"));
dotenv_1.default.config();
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products
 */
const getProducts = async (_, res) => {
    const products = await Product_1.default.find().populate("category");
    res.json(products);
};
exports.getProducts = getProducts;
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               price:
 *                 type: number
 *                 example: 1200
 *               category:
 *                 type: string
 *                 example: 64f1c2a9c1b2a123456789ab
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid category ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
const createProduct = async (req, res) => {
    const { name, price, category, oldPrice } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ error: "Invalid category ID" });
    }
    if (!Array.isArray(req.files)) {
        return res.status(400).json({ message: "Images are required" });
    }
    const Images = [];
    if (req.files) {
        for (const file of req.files) {
            const imageUrl = await claudinary_config_1.default.uploader.upload(file.path);
            Images.push(imageUrl.secure_url);
        }
    }
    const exists = await Categories_1.default.findById(category);
    if (!exists)
        return res.status(404).json({ error: "Category not found" });
    const product = await Product_1.default.create({
        name,
        price,
        oldPrice,
        Images: Images,
        category,
        createdBy: req.user.id,
    });
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productWithUrls = {
        ...product.toObject(),
    };
    res.status(201).json(productWithUrls);
};
exports.createProduct = createProduct;
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not allowed
 *       404:
 *         description: Product not found
 */
const updateProduct = async (req, res) => {
    const product = await Product_1.default.findById(req.params.id);
    if (!product)
        return res.status(404).json({ error: "Product not found" });
    if (req.user.role !== "admin" &&
        product.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ error: "Not allowed" });
    }
    Object.assign(product, req.body);
    await product.save();
    res.json(product);
};
exports.updateProduct = updateProduct;
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not allowed
 *       404:
 *         description: Product not found
 */
const deleteProduct = async (req, res) => {
    const product = await Product_1.default.findById(req.params.id);
    if (!product)
        return res.status(404).json({ error: "Product not found" });
    if (req.user.role !== "admin" &&
        product.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ error: "Not allowed" });
    }
    await product.deleteOne();
    res.json({ message: "Product deleted" });
};
exports.deleteProduct = deleteProduct;
const getProduct = async (req, res) => {
    const product = await Product_1.default.findById(req.params.id).populate("category");
    if (!product)
        return res.status(404).json({ error: "Product not found" });
    res.json(product);
};
exports.getProduct = getProduct;
