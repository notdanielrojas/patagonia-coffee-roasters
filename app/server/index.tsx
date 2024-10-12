const express = require("express");
const cors = require("cors");
const { logger } = require("./middlewares/logger.middleware");
const handleCredentialsRouter = require("./routes/login.routes");
const handleRegisterUserRouter = require("./routes/user.routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

app.use("/login", handleCredentialsRouter);
app.use("/users", handleRegisterUserRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
