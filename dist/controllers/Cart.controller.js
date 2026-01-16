"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carts = void 0;
exports.AddCart = AddCart;
exports.DeleteCart = DeleteCart;
exports.AddCartToggle = AddCartToggle;
exports.getAllCarts = getAllCarts;
exports.getCartByUserId = getCartByUserId;
const { v4: uuid } = require("uuid");
const Product_controller_1 = require("./Product.controller");
exports.carts = [
    {
        userId: uuid(),
        items: [
            { id: uuid(), productId: Product_controller_1.products[0].Id, quantity: 2 },
        ],
    },
    {
        userId: uuid(),
        items: [
            { id: uuid(), productId: Product_controller_1.products[1].Id, quantity: 3 },
        ],
    },
    {
        userId: uuid(),
        items: [
            { id: uuid(), productId: Product_controller_1.products[0].Id, quantity: 1 },
        ],
    },
];
function AddCart(userId, item) {
    return new Promise((resolve, reject) => {
        const IdCheckUp = exports.carts.find(cart => cart.userId === userId);
        if (IdCheckUp) {
            reject(new Error("cart already exists please try another id"));
            return;
        }
        const newCart = {
            userId: userId,
            items: item
        };
        exports.carts.push(newCart);
        resolve(newCart);
    });
}
function RemoveCart(userId) {
    const index = exports.carts.find(cart => cart.userId === userId);
    for (let i = 0; i < exports.carts.length; i++) {
        if (exports.carts[i].userId === userId) {
            return exports.carts.splice(i);
        }
    }
}
async function DeleteCart(req, res) {
    try {
        const userId = req.params.userId;
        const deletedCart = RemoveCart(userId);
        res.status(200).json({ message: "cart deleted successfully", cart: deletedCart });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function AddCartToggle(req, res) {
    try {
        const { userId, items } = req.body;
        const newCart = await AddCart(userId, items);
        res.status(201).json({ message: "cart added successfully", cart: newCart });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function getAllCarts(req, res) {
    try {
        res.status(200).json(exports.carts);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function getCartByUserId(req, res) {
    try {
        const { userId } = req.params;
        const cart = exports.carts.find(cart => cart.userId === userId);
        if (!cart) {
            res.status(404).json({ message: `cart with userId ${userId} not found` });
            return;
        }
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//# sourceMappingURL=Cart.controller.js.map