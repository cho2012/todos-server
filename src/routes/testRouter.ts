import express from "express";
import { test } from "../controllers/testController";

const router = express.Router();

router.get("/", test);

export default router;
