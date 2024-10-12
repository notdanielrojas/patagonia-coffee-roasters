import jwt from "jsonwebtoken";

const verifyDecodeToken = (authorizationHeader: string | undefined): string => {
  if (typeof authorizationHeader !== "string") {
    throw { code: 401, message: "No token provided" };
  }

  const parts = authorizationHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw { code: 401, message: "Invalid token format" };
  }

  const token = parts[1];
  if (!token) {
    throw { code: 401, message: "Invalid token" };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded || typeof decoded === "string" || !("email" in decoded)) {
      throw { code: 401, message: "Invalid token or email not present" };
    }
    return (decoded as { email: string }).email;
  } catch (error) {
    console.log("Error verifying or decoding token:", error);
    throw { code: 401, message: "Invalid or expired token" };
  }
};

export { verifyDecodeToken };
