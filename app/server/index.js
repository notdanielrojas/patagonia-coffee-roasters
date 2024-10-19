"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_middleware_1 = require("./middlewares/logger.middleware");
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const orders_routes_2 = __importDefault(require("./routes/orders.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(logger_middleware_1.logger);
app.use(express_1.default.json());
// Rutas
app.use("/login", login_routes_1.default);
app.use("/users", user_routes_1.default);
app.use("/posts", posts_routes_1.default);
app.use("/orders", orders_routes_1.default);
app.use("/order_details", orders_routes_2.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
