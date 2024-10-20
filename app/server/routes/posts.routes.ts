import { Router, Request, Response } from "express";
import { handleErrors } from "../utils/codes.utils";
import {
  handleGetPostsByUserId,
  handlePostUser,
  handleEditPostUser,
  handleDeletePostUser,
  handleGetAllPosts,
} from "../controllers/handlePosts.controller";
import { validateCredentialsAtSubmit } from "../middlewares/validate.middleware";

const router = Router();

const isErrorWithCode = (error: unknown): error is { code: number } => {
  return typeof error === "object" && error !== null && "code" in error;
};

router.get("/api/all", async (req: Request, res: Response): Promise<void> => {
  try {
    await handleGetAllPosts(req, res);
  } catch (error: unknown) {
    let statusCode = 500;

    if (isErrorWithCode(error)) {
      statusCode = error.code || 500;
    }

    const errorResponse = handleErrors(statusCode);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

router.get("/api/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    await handleGetPostsByUserId(req, res);
  } catch (error: unknown) {
    let statusCode = 500;

    if (isErrorWithCode(error)) {
      statusCode = error.code || 500;
    }

    const errorResponse = handleErrors(statusCode);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

router.post("/api", validateCredentialsAtSubmit, async (req: Request, res: Response): Promise<void> => {
  try {
    await handlePostUser(req, res);
  } catch (error: unknown) {
    let statusCode = 500;

    if (isErrorWithCode(error)) {
      statusCode = error.code || 500;
    }

    const errorResponse = handleErrors(statusCode);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

router.put("/api/:id", validateCredentialsAtSubmit, async (req: Request, res: Response): Promise<void> => {
  try {
    await handleEditPostUser(req, res);
  } catch (error: unknown) {
    let statusCode = 500;

    if (isErrorWithCode(error)) {
      statusCode = error.code || 500;
    }

    const errorResponse = handleErrors(statusCode);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

router.delete("/api/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    await handleDeletePostUser(req, res);
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
