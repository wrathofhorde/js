import express from "express";
import { getJoin, login, postJoin } from "../controllers/userControllers";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.get("/login", login);
rootRouter.route("/join").get(getJoin).post(postJoin);

export default rootRouter;
