"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productOwnerOrAdmin = void 0;
// middleware/productOwnership.ts
const Product_1 = __importDefault(require("../models/Product"));
const productOwnerOrAdmin = async (req, res, next) => {
    const product = await Product_1.default.findById(req.params.id);
    if (!product)
        return res.status(404).json({ error: "Product not found" });
    if (req.user.role === "admin" ||
        product.createdBy.toString() === req.user.id) {
        return next();
    }
    return res.status(403).json({ error: "Not allowed" });
};
exports.productOwnerOrAdmin = productOwnerOrAdmin;
