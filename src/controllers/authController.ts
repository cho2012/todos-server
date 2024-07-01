import { Request, Response } from "express";
import User from "../entities/user";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign(
      { id: user.id },
      "f-f-g-g-s-d-d-fg-fgh--sds-r-e-ds-g-sgds-gw--asdg-hfshsd-g-s-dh342q41-xasgsd",
      {
        expiresIn: "1h",
      }
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in", error });
  }
};
export { registerUser, loginUser };
