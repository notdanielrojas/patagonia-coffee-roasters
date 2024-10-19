"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const token_utils_1 = require("../utils/token.utils");
const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).json({ error: "Authorization header is missing" });
        return;
    }
    try {
        const email = (0, token_utils_1.verifyDecodeToken)(authorizationHeader);
        req.user = { email };
        next();
    }
    catch (error) {
        const customError = error;
        console.log("Middleware error:", customError);
        res.status(customError.code || 401).json({ error: customError.message || "Invalid token" });
        return;
    }
};
exports.authMiddleware = authMiddleware;
