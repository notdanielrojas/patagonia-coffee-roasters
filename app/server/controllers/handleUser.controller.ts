import { Request, Response } from "express";
import { registerUser, getUserByEmail } from "../models/user.model";
import { handleErrors, handleSuccess } from "../utils/codes.utils";

interface UserRequest extends Request {
  user?: {
    email: string;
  };
}

const handleRegisterUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body;
    await registerUser(user);

    const successResponse = handleSuccess(201);
    res.status(successResponse.status).json({
      message: successResponse.message,
      user,
    });
  } catch (error: any) {
    console.error("Error registering user:", error.message);
    const errorResponse = handleErrors(error.code || "500");
    res.status(errorResponse.status).json({ message: errorResponse.message });
  }
};

const handleGetUser = async (req: UserRequest, res: Response): Promise<void> => {
  const userEmail = req.user?.email;

  if (!userEmail) {
    const errorResponse = handleErrors(401);
    res.status(errorResponse.status).send(errorResponse.message);
    return;
  }

  try {
    const user = await getUserByEmail(userEmail);
    if (user) {
      const successResponse = handleSuccess(200);
      res.status(successResponse.status).json([user]);
      return;
    } else {
      const errorResponse = handleErrors(404);
      res.status(errorResponse.status).send(errorResponse.message);
      return;
    }
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    const errorResponse = handleErrors(500);
    res.status(errorResponse.status).send(errorResponse.message);
    return;
  }
};

export { handleGetUser, handleRegisterUser };
