import morgan from "morgan";
import express from "express";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const PORT = 4000;
const app = express();

app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, () => {
  console.log(`👌Listening on http://localhost:${PORT}`);
});
