import express from "express";
import {
  logout,
  remove,
  getEdit,
  postEdit,
} from "../controllers/userControllers";
import { protectorMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.get("/remove", remove);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);

export default userRouter;
