import { Router, Request, Response } from "express";
import { handleCredentialsAtLogin } from "../controllers/handleLogin.controller";
import { validateCredentialsAtLogin } from "../middlewares/validate.middleware";
import { handleErrors } from "../utils/codes.utils";

const router = Router();

const isErrorWithCode = (error: unknown): error is { code: number } => {
  return typeof error === "object" && error !== null && "code" in error;
};

router.post("/", validateCredentialsAtLogin, async (req: Request, res: Response): Promise<void> => {
  try {
    await handleCredentialsAtLogin(req, res);
  } catch (error: unknown) {
    let statusCode = 500;

    if (isErrorWithCode(error)) {
      statusCode = error.code || 500;
    }

    const errorResponse = handleErrors(statusCode);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

export default router;
