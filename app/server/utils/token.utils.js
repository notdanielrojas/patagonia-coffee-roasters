"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDecodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyDecodeToken = (authorizationHeader) => {
    if (typeof authorizationHeader !== "string") {
        throw { code: 401, message: "No token provided" };
    }
    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw { code: 401, message: "Invalid token format" };
    }
    const token = parts[1];
    if (!token) {
        throw { code: 401, message: "Invalid token" };
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded || typeof decoded === "string" || !("email" in decoded)) {
            throw { code: 401, message: "Invalid token or email not present" };
        }
        return decoded.email;
    }
    catch (error) {
        console.log("Error verifying or decoding token:", error);
        throw { code: 401, message: "Invalid or expired token" };
    }
};
exports.verifyDecodeToken = verifyDecodeToken;
