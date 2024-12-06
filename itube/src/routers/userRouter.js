import express from "express";
import {
  logout,
  remove,
  getEdit,
  postEdit,
  getProfile,
  getChangePassword,
  postChangePassword,
} from "../controllers/userControllers";
import { protectorMiddleware, avatarUpload } from "../middleware";

const userRouter = express.Router();

userRouter.get("/remove", remove);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/:id", getProfile);

export default userRouter;
