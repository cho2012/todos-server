import { Request, Response } from "express";
import User from "../entities/user";
import jwt from "jsonwebtoken";
import { redisClient } from "../redisClient";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, photoUrl } = req.body;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.photoUrl = photoUrl;

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ messeage: "Email and password are required" });
  }

  try {
    const user = await User.findOneBy({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid eamil or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid eamil or password" });
    }

    const token = jwt.sign({ id: user.id }, "f-f-g-g-s-d", {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in", error });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    try {
      await redisClient.set(token, "blacklisted");
      await redisClient.expire(token, 3600); // 1시간 후 만료
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Redis error:", error);
      res.status(500).json({ message: "Error logging out", error });
    }
  } else {
    res.status(400).json({ message: "No token provided" });
  }
};

export { registerUser, loginUser, logoutUser };
