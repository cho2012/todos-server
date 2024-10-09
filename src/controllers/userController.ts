import { Request, Response } from "express";
import User from "../entities/user";
import { redisClient } from "../redisClient";
import jwt, { JwtPayload } from "jsonwebtoken";

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, photoBase64, photoUrl, address, studentNum } = req.body;
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.error("--== cj ==-- no token");
      return;
    }
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      console.error("--== cj ==-- token is blacklisted");
      return;
    }
    const decoded = jwt.verify(token, "f-f-g-g-s-d") as JwtPayload;

    if (!decoded) {
      console.error("Token is not");
      return;
    }

    const user = await User.findOneBy({ id: Number(decoded.id) });
    if (!user) {
      console.error("user is not");
      return;
    }

    // const user = new User();
    user.name = name;
    user.email = email;
    user.photoUrl = photoUrl;
    user.address = address;
    user.photobase64 = photoBase64;
    user.studentNum = studentNum;

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};
