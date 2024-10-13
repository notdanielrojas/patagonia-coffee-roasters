import { Request, Response } from "express";
import { postUser, getAllPosts} from "../models/postUser.model";
import { handleErrors, handleSuccess } from "../utils/codes.utils";

interface UserRequest extends Request {
  user?: {
    id: string;
  };
}

const handlePostUser = async (req: UserRequest, res: Response): Promise<void> => {
  const { image_url, title, description } = req.body;
  if (!image_url || !title || !description) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    await postUser({ image_url, title, description });
    const successResponse = handleSuccess(201);
    res.status(successResponse.status).json(successResponse.message);
  } catch (error) {
    console.error(error);
    const errorResponse = handleErrors(500);
    res.status(errorResponse.status).json(errorResponse.message);
  }
};

const handleGetPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await getAllPosts();

    if (!posts.length) {
      const errorResponse = handleErrors(404);
      res.status(errorResponse.status).send(errorResponse.message);
      return;
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    const errorResponse = handleErrors(500);
    res.status(errorResponse.status).json(errorResponse.message);
  }
};

export { handlePostUser, handleGetPosts };
