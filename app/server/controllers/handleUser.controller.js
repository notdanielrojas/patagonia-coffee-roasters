"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteUser = exports.handleEditUser = exports.handleRegisterUser = exports.handleGetAllUsers = exports.handleGetUser = void 0;
const user_model_1 = require("../models/user.model");
const codes_utils_1 = require("../utils/codes.utils");
const handleRegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        yield (0, user_model_1.registerUser)(user);
        const successResponse = (0, codes_utils_1.handleSuccess)(201);
        res.status(successResponse.status).json({
            message: successResponse.message,
            user,
        });
    }
    catch (error) {
        const customError = error;
        console.error("Error registering user:", customError.message);
        const errorResponse = (0, codes_utils_1.handleErrors)(customError.code || 500);
        res.status(errorResponse.status).json({ message: errorResponse.message });
    }
});
exports.handleRegisterUser = handleRegisterUser;
const handleGetUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    if (!userEmail) {
        const errorResponse = (0, codes_utils_1.handleErrors)(401);
        res.status(errorResponse.status).send(errorResponse.message);
        return;
    }
    try {
        const user = yield (0, user_model_1.getUserByEmail)(userEmail);
        if (user) {
            const successResponse = (0, codes_utils_1.handleSuccess)(200);
            res.status(successResponse.status).json([user]);
        }
        else {
            const errorResponse = (0, codes_utils_1.handleErrors)(404);
            res.status(errorResponse.status).send(errorResponse.message);
        }
    }
    catch (error) {
        const customError = error;
        console.error("Error fetching user:", customError.message);
        const errorResponse = (0, codes_utils_1.handleErrors)(500);
        res.status(errorResponse.status).send(errorResponse.message);
    }
});
exports.handleGetUser = handleGetUser;
const handleGetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_model_1.getAllUsers)();
        if (!users.length) {
            const errorResponse = (0, codes_utils_1.handleErrors)(404);
            res.status(errorResponse.status).send(errorResponse.message);
            return;
        }
        res.status(200).json(users);
    }
    catch (error) {
        const customError = error;
        console.error("Error fetching users:", customError.message);
        const errorResponse = (0, codes_utils_1.handleErrors)(500);
        res.status(errorResponse.status).json({ message: errorResponse.message });
    }
});
exports.handleGetAllUsers = handleGetAllUsers;
const handleEditUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    const userData = req.body;
    try {
        yield (0, user_model_1.editUser)(userId, userData);
        const successResponse = (0, codes_utils_1.handleSuccess)(200);
        res.status(successResponse.status).json({ message: successResponse.message });
    }
    catch (error) {
        const customError = error;
        console.error("Error editing user:", customError.message);
        const errorResponse = (0, codes_utils_1.handleErrors)(customError.code || 500);
        res.status(errorResponse.status).json({ message: errorResponse.message });
    }
});
exports.handleEditUser = handleEditUser;
const handleDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    try {
        yield (0, user_model_1.deleteUser)(userId);
        const successResponse = (0, codes_utils_1.handleSuccess)(200);
        res.status(successResponse.status).json({ message: successResponse.message });
    }
    catch (error) {
        const customError = error;
        console.error("Error deleting user:", customError.message);
        const errorResponse = (0, codes_utils_1.handleErrors)(customError.code || 500);
        res.status(errorResponse.status).json({ message: errorResponse.message });
    }
});
exports.handleDeleteUser = handleDeleteUser;
