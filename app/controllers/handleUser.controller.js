const { registerUser, getUserByEmail } = require("../models/user.model");
const { handleErrors, handleSuccess } = require("../utils/codes.utils");

const handleRegisterUser = async (req, res) => {
  try {
    const user = req.body;
    await registerUser(user);
    const successResponse = handleSuccess(201);
    res
      .status(successResponse.status)
      .json({ message: successResponse.message, user });
  } catch (error) {
    console.error("Error registering user:", error.message);
    const errorResponse = handleErrors(error.code || "500");
    res.status(errorResponse.status).json({ message: errorResponse.message });
  }
};

const handleGetUser = async (req, res) => {
  const userEmail = req.user.email;
  try {
    const user = await getUserByEmail(userEmail);
    if (user) {
      const successResponse = handleSuccess(200);
      res.status(successResponse.status).json([user]);
    } else {
      const errorResponse = handleErrors("404");
      res.status(errorResponse.status).send(errorResponse.message);
    }
  } catch (error) {
    console.error("Error fetching user:", error.message);
    const errorResponse = handleErrors("500");
    res.status(errorResponse.status).send(errorResponse.message);
  }
};

module.exports = { handleGetUser, handleRegisterUser };
