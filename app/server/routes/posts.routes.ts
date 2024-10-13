/* import { Router, Request, Response } from "express";
import { handleErrors } from "../utils/codes.utils";
import { handlePostUser } from "../controllers/handleUser.controller";
import { validateCredentialsAtSubmit } from "../middlewares/validate.middleware";

const router = Router();

router.post("/", validateCredentialsAtSubmit, async (req: Request, res: Response): Promise<void> => {
  try {
    await handlePostUser(req, res);
  } catch (error: any) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

export default router;
 */