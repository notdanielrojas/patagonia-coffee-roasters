import { Router, Request, Response } from "express";
import { handleErrors } from "../utils/codes.utils";
import { handleRegisterUser, handleGetUser,/*  handlePostUser  */} from "../controllers/handleUser.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateCredentialsAtRegister } from "../middlewares/validate.middleware";
import { validateCredentialsAtSubmit } from "../middlewares/validate.middleware";

const router = Router();

router.post("/", validateCredentialsAtRegister, async (req: Request, res: Response): Promise<void> => {
  try {
    await handleRegisterUser(req, res);
  } catch (error: any) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});



router.get("/", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await handleGetUser(req, res);
  } catch (error: any) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

export default router;
