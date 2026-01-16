"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../controllers/User.controller");
const createRoute = (0, express_1.Router)();
createRoute.get("/", User_controller_1.getAllUsers);
createRoute.post("/:user", User_controller_1.AddUser);
createRoute.delete("/:id", User_controller_1.deleteUser);
exports.default = createRoute;
//# sourceMappingURL=User.js.map