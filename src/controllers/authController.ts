import { Request, Response } from "express";
import User from "../entities/user";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

export { registerUser };
