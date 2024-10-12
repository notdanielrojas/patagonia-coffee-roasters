import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { verifyCredentials } from "../models/login.model";
import { handleErrors, handleSuccess } from "../utils/codes.utils";


const handleCredentials = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    await verifyCredentials(email, password);
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  
    const successResponse = handleSuccess(200);
    res.status(successResponse.status).json({
      message: successResponse.message,
      token,
    });
  } catch (error: any) {
    console.error("Error during credentials verification:", error.message);

    const errorResponse = handleErrors(401);
    res.status(errorResponse.status).json({ error: errorResponse.message });
  }
};

export { handleCredentials };
