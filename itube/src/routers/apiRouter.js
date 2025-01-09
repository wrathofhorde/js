import express from "express";
import { removeComment } from "../controllers/commentController";
import { registerView, addComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", addComment);
apiRouter.delete("/comments/delete", removeComment);

export default apiRouter;
