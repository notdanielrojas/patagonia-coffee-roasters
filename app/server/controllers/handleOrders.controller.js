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
exports.HandleAddOrderDetails = exports.HandleDeleteOrder = exports.HandleUpdateOrderStatus = exports.HandleGetOrdersByUserId = exports.HandleCreateOrder = void 0;
const orders_model_1 = require("../models/orders.model");
const codes_utils_1 = require("../utils/codes.utils");
const HandleCreateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, cart } = req.body;
    if (!user_id || !cart || cart.length === 0) {
        res.status(400).json({ message: "Invalid order request" });
        return;
    }
    try {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const order_id = yield (0, orders_model_1.createOrder)({ user_id, total, status: "pending" });
        for (const item of cart) {
            yield (0, orders_model_1.addOrderDetails)({
                order_id,
                image_url: item.image_url,
                product_name: item.name,
                quantity: item.quantity,
                price: item.price,
            });
        }
        res.status(201).json({ message: "Order created successfully", order_id });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error creating order:", error.message);
        }
        else {
            console.error("Unexpected error:", error);
        }
        res.status(500).json({ message: "Failed to create order" });
    }
});
exports.HandleCreateOrder = HandleCreateOrder;
const HandleGetOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = parseInt(req.params.user_id);
    if (isNaN(user_id)) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
    }
    try {
        const orders = yield (0, orders_model_1.getOrdersByUserId)(user_id);
        res.status(200).json(orders);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching orders:", error.message);
        }
        else {
            console.error("Unexpected error:", error);
        }
        res.status(500).json({ message: "Failed to fetch orders" });
    }
});
exports.HandleGetOrdersByUserId = HandleGetOrdersByUserId;
const HandleUpdateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params.orderId);
    const { status } = req.body;
    if (isNaN(orderId) || !status) {
        res.status(400).json({ message: "Invalid order ID or status" });
        return;
    }
    try {
        yield (0, orders_model_1.updateOrderStatus)(orderId, status);
        res.status(200).json({ message: "Order status updated successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error updating order status:", error.message);
        }
        else {
            console.error("Unexpected error:", error);
        }
        res.status(500).json({ message: "Failed to update order status" });
    }
});
exports.HandleUpdateOrderStatus = HandleUpdateOrderStatus;
const HandleDeleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params.orderId);
    if (isNaN(orderId)) {
        res.status(400).json({ message: "Invalid order ID" });
        return;
    }
    try {
        yield (0, orders_model_1.deleteOrder)(orderId);
        res.status(200).json({ message: "Order deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error deleting order:", error.message);
        }
        else {
            console.error("Unexpected error:", error);
        }
        res.status(500).json({ message: "Failed to delete order" });
    }
});
exports.HandleDeleteOrder = HandleDeleteOrder;
const HandleAddOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const details = req.body;
    try {
        yield (0, orders_model_1.addOrderDetails)(Object.assign({ order_id: parseInt(orderId) }, details));
        res.status(201).json({ message: "Order details added successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            const customError = error;
            const errorResponse = (0, codes_utils_1.handleErrors)(customError.code || 500);
            res.status(errorResponse.status).send(errorResponse.message);
        }
        else {
            const errorResponse = (0, codes_utils_1.handleErrors)(500);
            res.status(errorResponse.status).send(errorResponse.message);
        }
    }
});
exports.HandleAddOrderDetails = HandleAddOrderDetails;
