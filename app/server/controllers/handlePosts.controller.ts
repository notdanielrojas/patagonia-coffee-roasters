import { Request, Response } from "express";
import { postUser, getPostsByUserId, editPostUser, deletePostUser, getAllPosts } from "../models/posts.model";
import { handleErrors, handleSuccess } from "../utils/codes.utils";

interface UserRequest extends Request {
  user?: {
    id: string;
  };
}

const handlePostUser = async (req: UserRequest, res: Response): Promise<void> => {
  const { image_url, title, description, user } = req.body;

  console.log("Request Body:", req.body);
  console.log("User ID:", user?.id);
  if (!image_url || !title || !description || !user?.id) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    await postUser({ image_url, title, description, user_id: user.id });
    const successResponse = handleSuccess(201);
    res.status(successResponse.status).json(successResponse.message);
  } catch (error) {
    console.error(error);
    const errorResponse = handleErrors(500);
    res.status(errorResponse.status).json({ message: errorResponse.message, error: (error as Error).message });
  }
};

const handleGetPostsByUserId = async (req: UserRequest, res: Response): Promise<void> => {
  const userId = Number(req.user?.id);

  try {
    const posts = await getPostsByUserId(userId);

    if (!posts.length) {
      const errorResponse = handleErrors(404);
      res.status(errorResponse.status).send(errorResponse.message);
      return;
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    const errorResponse = handleErrors(500);
    res.status(errorResponse.status).json({ message: errorResponse.message, error: (error as Error).message });
  }
};

const handleGetAllPosts = async (req: Request, res: Response): Promise<void> => {
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
    res.status(errorResponse.status).json({ message: errorResponse.message, error: (error as Error).message });
  }
};

const handleEditPostUser = async (req: UserRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { image_url, title, description } = req.body;
  const userId = req.user?.id;

  if (!image_url || !title || !description || !userId) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    await editPostUser(Number(id), { image_url, title, description, user_id: Number(userId) });
    const successResponse = handleSuccess(200);
    res.status(successResponse.status).json(successResponse.message);
  } catch (error) {
    console.error(error);
    const errorResponse = handleErrors(500);
    res.status(errorResponse.status).json({ message: errorResponse.message, error: (error as Error).message });
  }
};

const handleDeletePostUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await deletePostUser(Number(id));
    const successResponse = handleSuccess(204);
    res.status(successResponse.status).send(successResponse.message);
  } catch (error) {
    console.error(error);
    const errorResponse = handleErrors(500);
    res.status(errorResponse.status).json({ message: errorResponse.message, error: (error as Error).message });
  }
};

export { handlePostUser, handleGetPostsByUserId, handleEditPostUser, handleDeletePostUser, handleGetAllPosts };