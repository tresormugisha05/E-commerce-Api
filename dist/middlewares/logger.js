"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    console.log(`request Method  ${req.method}  ${req.originalUrl}  `);
    next();
};
exports.default = logger;
//# sourceMappingURL=logger.js.map