"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("../controllers/orders.controller");
const app = (0, express_1.default)();
app.post("/", orders_controller_1.NewOrder);
app.put("/:orderId", orders_controller_1.updateOrder);
app.delete("/:orderId", orders_controller_1.DeleteOrder);
exports.default = app;
