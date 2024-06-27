import express from "express";
import {
  //   loginUesr,
  //   logoutUser,
  registerUser,
} from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
// authRouter.post("/login", loginUesr);
// authRouter.post("/logout", logoutUser);

export default authRouter;
