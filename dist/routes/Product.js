"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_controller_1 = require("../controllers/Product.controller");
const App = (0, express_1.Router)();
App.get("/products", Product_controller_1.getAllProducts);
App.get("/product/:ProductId", Product_controller_1.getProductById);
App.post("/products", Product_controller_1.AddProductToggle);
App.delete("/products/:userId", Product_controller_1.DeleteProduct);
exports.default = App;
//# sourceMappingURL=Product.js.map