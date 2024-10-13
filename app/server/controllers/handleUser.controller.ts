import { Request, Response } from "express";
import { registerUser, getUserByEmail, editUser, deleteUser, getAllUsers } from "../models/user.model";
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

const handleGetAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();

    if (!users.length) {
      const errorResponse = handleErrors(404);
      res.status(errorResponse.status).send(errorResponse.message);
      return;
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    const errorResponse = handleErrors(500);
    res.status(errorResponse.status).json(errorResponse.message);
  }
};

const handleEditUser = async (req: UserRequest, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id, 10);
  const userData = req.body;

  try {
    await editUser(userId, userData);
    const successResponse = handleSuccess(200);
    res.status(successResponse.status).json({ message: successResponse.message });
  } catch (error: any) {
    console.error("Error editing user:", error.message);
    const errorResponse = handleErrors(error.code || "500");
    res.status(errorResponse.status).json({ message: errorResponse.message });
  }
};

const handleDeleteUser = async (req: UserRequest, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id, 10);

  try {
    await deleteUser(userId);
    const successResponse = handleSuccess(200);
    res.status(successResponse.status).json({ message: successResponse.message });
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
    const errorResponse = handleErrors(error.code || "500");
    res.status(errorResponse.status).json({ message: errorResponse.message });
  }
};

export { handleGetUser, handleGetAllUsers, handleRegisterUser, handleEditUser, handleDeleteUser };
