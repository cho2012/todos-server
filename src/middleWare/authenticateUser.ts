import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { connectRedis, redisClient } from "../redisClient";
import User from "../entities/user";

interface JwtPayload {
  id: number;
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    await connectRedis(); // Redis 연결 확인

    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const decoded = jwt.verify(token, "f-f-g-g-s-d") as JwtPayload;

    if (!decoded) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    const user = await User.findBy({ id: Number(decoded.id) });
    if (!user) {
      return res.status(401).json({ message: "not existed user" });
    }
    const { password, ...withoutPassword } = user[0];
    req.user = withoutPassword;
    +next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};
