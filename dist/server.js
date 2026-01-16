"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Carts_1 = __importDefault(require("./routes/Carts"));
const Product_1 = __importDefault(require("./routes/Product"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//middleware
app.use(logger_1.default);
//routes
app.use("/carts", Carts_1.default);
app.use("/products", Product_1.default);
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map