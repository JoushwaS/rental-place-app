import { Router } from "express";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import { verifyToken } from "../middlewares/common.middleware";

const router = Router();

// router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
