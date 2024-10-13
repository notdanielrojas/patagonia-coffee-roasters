interface ErrorResponse {
  status: number;
  message: string;
}

interface SuccessResponse {
  status: number;
  message: string;
}

const handleErrors = (code: number): ErrorResponse => {
  switch (code) {
    case 400:
      return {
        status: 400,
        message: "Insufficient data.",
      };
    case 404:
      return {
        status: 404,
        message: "User not found.",
      };
    case 401:
      return {
        status: 401,
        message: "Invalid email or password.",
      };
    case 409: // Conflicto, por ejemplo, al intentar editar un usuario existente
      return {
        status: 409,
        message: "User already exists.",
      };
    default:
      return {
        status: 500,
        message: "Internal server error.",
      };
  }
};

const handleSuccess = (code: number): SuccessResponse => {
  switch (code) {
    case 201:
      return {
        status: 201,
        message: "User created successfully.",
      };
    default:
      return {
        status: 200,
        message: "Request successful.",
      };
  }
};

export { handleErrors, handleSuccess };
