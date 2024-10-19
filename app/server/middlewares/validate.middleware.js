"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentialsAtSubmit = exports.validateCredentialsAtLogin = exports.validateCredentialsAtRegister = void 0;
const validateCredentialsAtRegister = (req, res, next) => {
    const { name, last_name, email, password } = req.body;
    if (!name || !last_name || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    next();
};
exports.validateCredentialsAtRegister = validateCredentialsAtRegister;
const validateCredentialsAtLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    next();
};
exports.validateCredentialsAtLogin = validateCredentialsAtLogin;
const validateCredentialsAtSubmit = (req, res, next) => {
    const { image_url, title, description, user } = req.body;
    if (!image_url || !title || !description || !(user === null || user === void 0 ? void 0 : user.id)) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    next();
};
exports.validateCredentialsAtSubmit = validateCredentialsAtSubmit;
