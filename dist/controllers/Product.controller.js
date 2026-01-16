"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
exports.AddNewProduct = AddNewProduct;
exports.DeleteProduct = DeleteProduct;
exports.AddProductToggle = AddProductToggle;
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
const { v4: uuid } = require("uuid");
const Cart_controller_1 = require("./Cart.controller");
exports.products = [
    {
        Id: uuid(),
        name: "Harry Potter Book",
        price: 19.99,
        description: "Fantasy novel",
        categoryId: Cart_controller_1.carts[0].userId,
        inStock: true,
        quantity: 50,
    },
    {
        Id: uuid(),
        name: "iPhone 15",
        price: 999.99,
        description: "Latest smartphone",
        categoryId: Cart_controller_1.carts[1].userId,
        inStock: true,
        quantity: 20,
    },
    {
        Id: uuid(),
        name: "T-Shirt",
        price: 14.99,
        description: "Cotton t-shirt",
        categoryId: Cart_controller_1.carts[2].userId,
        inStock: true,
        quantity: 100,
    },
];
function AddProduct(Newproduct) {
    return new Promise((resolve, reject) => {
        const IdCheckUp = exports.products.find(product => product.Id === Newproduct.Id);
        if (IdCheckUp) {
            reject(new Error("cart already exists please try another id"));
            return;
        }
        const Product = Newproduct;
        exports.products.push(Product);
        resolve(Product);
    });
}
async function AddNewProduct(req, res) {
}
function RemoveProduct(userId) {
    const index = exports.products.find(product => product.Id === userId);
    for (let i = 0; i < exports.products.length; i++) {
        if (exports.products[i].Id === userId) {
            return exports.products.splice(i);
        }
    }
}
async function DeleteProduct(req, res) {
    try {
        const userId = req.params.userId;
        const deletedProduct = RemoveProduct(userId);
        res.status(200).json({ message: "cart deleted successfully", product: deletedProduct });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function AddProductToggle(req, res) {
    try {
        const { product } = req.body;
        const Newproduct = await AddProduct(product);
        res.status(201).json({ message: "cart added successfully", cart: Newproduct });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function getAllProducts(req, res) {
    try {
        res.status(200).json(exports.products);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function getProductById(req, res) {
    try {
        const { ProductId } = req.params;
        const product = exports.products.find(product => product.Id === ProductId);
        if (!product) {
            res.status(404).json({ message: `cart with userId ${ProductId} not found` });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//# sourceMappingURL=Product.controller.js.map