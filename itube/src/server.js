import morgan from "morgan";
import express from "express";
import flash from "express-flash";
import session from "express-session";
import MongoStore from "connect-mongo";
import apiRouter from "./routers/apiRouter";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localMiddleware } from "./middleware";

const serv = express();

serv.set("view engine", "pug");
serv.set("views", process.cwd() + "/src/views");
serv.use(morgan("dev"));
serv.use(express.json());
serv.use(express.urlencoded({ extended: true }));
serv.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
serv.use(flash());
serv.use("/static", express.static("assets"));
serv.use("/uploads", express.static("uploads"));

// serv.use((req, res, next) => {
//   req.sessionStore.all((err, obj) => {
//     console.log(obj);
//     next();
//   });
// });

serv.use(localMiddleware);

serv.use("/", rootRouter);
serv.use("/api", apiRouter);
serv.use("/users", userRouter);
serv.use("/videos", videoRouter);

export default serv;
