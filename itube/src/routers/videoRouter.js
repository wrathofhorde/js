import express from "express";
import { watch } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);

export default videoRouter;
