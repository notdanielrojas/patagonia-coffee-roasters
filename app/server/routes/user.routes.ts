import { Router, Request, Response } from "express";
import { handleErrors } from "../utils/codes.utils";
import {
  handleRegisterUser,
  handleGetUser,
  handleEditUser,
  handleDeleteUser,
  handleGetAllUsers,
} from "../controllers/handleUser.controller";
import { validateCredentialsAtRegister } from "../middlewares/validate.middleware";

const router = Router();

const isErrorWithCode = (error: unknown): error is { code: number } => {
  return typeof error === "object" && error !== null && "code" in error;
};

router.post("/api", validateCredentialsAtRegister, async (req: Request, res: Response): Promise<void> => {
  try {
    await handleRegisterUser(req, res);
  } catch (error: unknown) {
    let statusCode = 500;

    if (isErrorWithCode(error)) {
      statusCode = error.code || 500;
    }

    const errorResponse = handleErrors(statusCode);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

router.get("/api", async (req: Request, res: Response): Promise<void> => {
  try {
    await handleGetUser(req, res);
  } catch (error: unknown) {
    let statusCode = 500;

    if (isErrorWithCode(error)) {
      statusCode = error.code || 500;
    }

    const errorResponse = handleErrors(statusCode);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

router.get("/api/all", async (req: Request, res: Response): Promise<void> => {
  try {
    await handleGetAllUsers(req, res);
  } catch (error: unknown) {
    let statusCode = 500;

    if (isErrorWithCode(error)) {
      statusCode = error.code || 500;
    }

    const errorResponse = handleErrors(statusCode);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

router.put("/api/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    await handleEditUser(req, res);
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
    await handleDeleteUser(req, res);
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
