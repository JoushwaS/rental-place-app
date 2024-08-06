import { Router } from "express";
import userRouter from "./user.router";
import { verifyToken } from "../middlewares/common.middleware";

const router = Router();

router.use("/user", verifyToken, userRouter);

export default router;
