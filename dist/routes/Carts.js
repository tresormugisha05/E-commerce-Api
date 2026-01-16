"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cart_controller_1 = require("../controllers/Cart.controller");
const router = (0, express_1.Router)();
router.get("/", Cart_controller_1.getAllCarts);
router.get("/:id", Cart_controller_1.getCartByUserId);
router.post("/", Cart_controller_1.AddCartToggle);
router.delete("/:userId", Cart_controller_1.DeleteCart);
exports.default = router;
//# sourceMappingURL=Carts.js.map