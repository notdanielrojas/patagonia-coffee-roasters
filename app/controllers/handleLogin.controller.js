const jwt = require("jsonwebtoken");
const { verifyCredentials } = require("../models/login.model");
const { handleErrors, handleSuccess } = require("../utils/codes.utils");

const handleCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;
    await verifyCredentials(email, password);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const successResponse = handleSuccess(200);
    res.status(successResponse.status).json({
      message: successResponse.message,
      token,
    });
  } catch (error) {
    console.error("Error during credentials verification:", error.message);
    const errorResponse = handleErrors("401");
    res.status(errorResponse.status).json({ error: errorResponse.message });
  }
};

module.exports = { handleCredentials };
