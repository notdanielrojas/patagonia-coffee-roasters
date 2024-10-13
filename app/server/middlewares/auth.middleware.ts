import { Request, Response, NextFunction } from "express";
import { verifyDecodeToken } from "../utils/token.utils";

interface CustomRequest extends Request {
  user?: { email: string };
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({ error: "Authorization header is missing" });
    return;
  }

  try {
    const email = verifyDecodeToken(authorizationHeader);
    req.user = { email };
    next();
  } catch (error: any) {
    console.log("Middleware error:", error);
    res.status(error.code || 401).json({ error: error.message || "Invalid token" });
    return;
  }
};

export { authMiddleware };
