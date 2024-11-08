import express from "express";
import { logout, see } from "../controllers/userControllers";
import { edit, remove } from "../controllers/videoController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/:id", see);

export default userRouter;
