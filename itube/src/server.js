import morgan from "morgan";
import express from "express";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const serv = express();

serv.set("view engine", "pug");
serv.set("views", process.cwd() + "/src/views");
serv.use(morgan("dev"));
serv.use(express.urlencoded({ extended: true }));

serv.use("/", rootRouter);
serv.use("/users", userRouter);
serv.use("/videos", videoRouter);

export default serv;
