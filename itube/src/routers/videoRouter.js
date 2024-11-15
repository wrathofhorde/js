import express from "express";
import { see } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", see);

export default videoRouter;
