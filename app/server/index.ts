import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger.middleware";
import handleCredentialsRouter from "./routes/login.routes";
import handleRegisterUserRouter from "./routes/user.routes";
import dotenv from "dotenv";
/* import handlePostUserRouter from "./routes/posts.routes"; */

dotenv.config();

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

app.use("/login", handleCredentialsRouter);
app.use("/users", handleRegisterUserRouter);
/* app.use("/posts", handlePostUserRouter); */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
