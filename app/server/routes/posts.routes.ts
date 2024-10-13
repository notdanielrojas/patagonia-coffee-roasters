import { Router, Request, Response } from "express";
import { handleErrors } from "../utils/codes.utils";
import {
  handleGetPosts,
  handlePostUser,
  handleEditPostUser,
  handleDeletePostUser,
} from "../controllers/handlePostUser.controller";
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

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    await handleGetPosts(req, res);
  } catch (error: any) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

router.put("/:id", validateCredentialsAtSubmit, async (req: Request, res: Response): Promise<void> => {
  try {
    await handleEditPostUser(req, res);
  } catch (error: any) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    await handleDeletePostUser(req, res);
  } catch (error: any) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

export default router;
