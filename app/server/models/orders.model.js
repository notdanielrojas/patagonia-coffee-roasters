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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.getOrdersByUserId = exports.addOrderDetails = exports.createOrder = void 0;
const database_model_1 = __importDefault(require("./database.model"));
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, total, status } = order;
    const query = `
    INSERT INTO orders (user_id, total, status)
    VALUES ($1, $2, $3) RETURNING id
  `;
    const values = [user_id, total, status];
    const result = yield database_model_1.default.query(query, values);
    return result.rows[0].id;
});
exports.createOrder = createOrder;
const addOrderDetails = (details) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id, image_url, product_name, quantity, price } = details;
    const query = `
    INSERT INTO order_details (order_id, image_url, product_name, quantity, price)
    VALUES ($1, $2, $3, $4, $5)
  `;
    const values = [order_id, image_url, product_name, quantity, price];
    yield database_model_1.default.query(query, values);
});
exports.addOrderDetails = addOrderDetails;
const getOrdersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT od.id, od.product_name as producto, od.image_url, od.price, od.quantity, o.total 
    FROM order_details od
    JOIN orders o ON od.order_id = o.id
    WHERE o.user_id = $1
  `;
    const values = [userId];
    const result = yield database_model_1.default.query(query, values);
    return result.rows;
});
exports.getOrdersByUserId = getOrdersByUserId;
const updateOrderStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    UPDATE orders
    SET status = $1
    WHERE id = $2
  `;
    const values = [status, orderId];
    yield database_model_1.default.query(query, values);
});
exports.updateOrderStatus = updateOrderStatus;
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    DELETE FROM orders
    WHERE id = $1
  `;
    const values = [orderId];
    yield database_model_1.default.query(query, values);
});
exports.deleteOrder = deleteOrder;
