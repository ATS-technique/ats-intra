import jwt, { TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: number;
}

interface CustomRequest extends Request {
  user?: JwtPayload;
}

const auth = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: "Token is expired" });
    } else {
      res.status(401).json({ message: "Token is not valid" });
    }
  }
};

export default auth;
