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
const express_1 = require("express");
const codes_utils_1 = require("../utils/codes.utils");
const handleUser_controller_1 = require("../controllers/handleUser.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const router = (0, express_1.Router)();
const isErrorWithCode = (error) => {
    return typeof error === "object" && error !== null && "code" in error;
};
router.post("/", validate_middleware_1.validateCredentialsAtRegister, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, handleUser_controller_1.handleRegisterUser)(req, res);
    }
    catch (error) {
        let statusCode = 500;
        if (isErrorWithCode(error)) {
            statusCode = error.code || 500;
        }
        const errorResponse = (0, codes_utils_1.handleErrors)(statusCode);
        res.status(errorResponse.status).send(errorResponse.message);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, handleUser_controller_1.handleGetUser)(req, res);
    }
    catch (error) {
        let statusCode = 500;
        if (isErrorWithCode(error)) {
            statusCode = error.code || 500;
        }
        const errorResponse = (0, codes_utils_1.handleErrors)(statusCode);
        res.status(errorResponse.status).send(errorResponse.message);
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, handleUser_controller_1.handleGetAllUsers)(req, res);
    }
    catch (error) {
        let statusCode = 500;
        if (isErrorWithCode(error)) {
            statusCode = error.code || 500;
        }
        const errorResponse = (0, codes_utils_1.handleErrors)(statusCode);
        res.status(errorResponse.status).send(errorResponse.message);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, handleUser_controller_1.handleEditUser)(req, res);
    }
    catch (error) {
        let statusCode = 500;
        if (isErrorWithCode(error)) {
            statusCode = error.code || 500;
        }
        const errorResponse = (0, codes_utils_1.handleErrors)(statusCode);
        res.status(errorResponse.status).send(errorResponse.message);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, handleUser_controller_1.handleDeleteUser)(req, res);
    }
    catch (error) {
        let statusCode = 500;
        if (isErrorWithCode(error)) {
            statusCode = error.code || 500;
        }
        const errorResponse = (0, codes_utils_1.handleErrors)(statusCode);
        res.status(errorResponse.status).send(errorResponse.message);
    }
}));
exports.default = router;
