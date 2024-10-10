const handleErrors = (code) => {
  switch (code) {
    case "400":
      return {
        status: 400,
        message: "Insufficient data.",
      };
    case "404":
      return {
        status: 404,
        message: "User not found.",
      };
    case "401":
      return {
        status: 401,
        message: "Invalid email or password.",
      };
    default:
      return {
        status: 500,
        message: "Internal server error.",
      };
  }
};

const handleSuccess = (code) => {
  switch (code) {
    case 200:
      return {
        status: 200,
        message: "Login successful.",
      };
    case 201:
      return {
        status: 201,
        message: "User created successfully.",
      };
    case 204:
      return {
        status: 204,
        message: "User deleted successfully.",
      };
    default:
      return {
        status: 200,
        message: "Request successful.",
      };
  }
};

module.exports = { handleErrors, handleSuccess };
