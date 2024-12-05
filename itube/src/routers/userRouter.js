import express from "express";
import {
  logout,
  remove,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userControllers";
import { protectorMiddleware, uploadFiles } from "../middleware";

const userRouter = express.Router();

userRouter.get("/remove", remove);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadFiles.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

export default userRouter;
