import { Router, Request, Response } from "express";
import { handleCredentials } from "../controllers/handleLogin.controller";
import { validateCredentialsAtLogin } from "../middlewares/validate.middleware";
import { handleErrors } from "../utils/codes.utils";

const router = Router();


router.post("/", validateCredentialsAtLogin, async (req: Request, res: Response): Promise<void> => {
  try {
    await handleCredentials(req, res);
  } catch (error: any) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

export default router;
