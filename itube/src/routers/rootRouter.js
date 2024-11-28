import express from "express";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
} from "../controllers/userControllers";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);

export default rootRouter;
