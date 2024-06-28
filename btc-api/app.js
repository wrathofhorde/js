import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import btcRouter from "./routers/btc.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/btc", btcRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello");
});
