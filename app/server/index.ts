import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./middlewares/logger.middleware";
import handleCredentialsRouter from "./routes/login.routes";
import handleRegisterUserRouter from "./routes/user.routes";
import handlePostUserRouter from "./routes/posts.routes";
import handleOrderRouter from "./routes/orders.routes";
import HandleOrdersByUserIdRouter from "./routes/orders.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

// Rutas
app.use("/login", handleCredentialsRouter);
app.use("/users", handleRegisterUserRouter);
app.use("/posts", handlePostUserRouter);
app.use("/orders", handleOrderRouter);
app.use("/order_details", HandleOrdersByUserIdRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
