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
const handleOrders_controller_1 = require("../controllers/handleOrders.controller");
const orders_model_1 = require("../models/orders.model");
const codes_utils_1 = require("../utils/codes.utils");
const router = (0, express_1.Router)();
const isErrorWithCode = (error) => {
    return typeof error === "object" && error !== null && "code" in error;
};
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, handleOrders_controller_1.HandleCreateOrder)(req, res);
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
router.post("/:orderId/details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const details = req.body;
    try {
        yield (0, orders_model_1.addOrderDetails)(Object.assign({ order_id: parseInt(orderId) }, details));
        res.status(201).json({ message: "Order details added successfully" });
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
router.get("/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, handleOrders_controller_1.HandleGetOrdersByUserId)(req, res);
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
router.put("/:orderId/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, handleOrders_controller_1.HandleUpdateOrderStatus)(req, res);
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
router.delete("/:orderId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, handleOrders_controller_1.HandleDeleteOrder)(req, res);
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
