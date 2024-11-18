import express from "express";
import { login, logout, remove } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/remove", remove);

export default userRouter;
