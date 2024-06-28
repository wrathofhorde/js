import axios from "axios";
import dotenv from "dotenv";
import express, { response } from "express";

dotenv.config();

const btcRouter = express.Router();

const serv = process.env.BTC_RPC;
const user = process.env.BTC_RPC_USER;
const pass = process.env.BTC_RPC_PASSWORD;
const headers = {
  "content-type": "text/plain;",
};

btcRouter.get("/test", (req, res) => {
  res.send("btc test");
});

btcRouter.get("/getblockchaininfo", async (req, res) => {
  try {
    const url = `http://${user}:${pass}@${serv}/`;
    const body = `{"jsonrpc":"1.0","id":"curltext","method":"getblockchaininfo","params":[]}`;
    const response = await axios.post(url, body, {
      headers,
    });
    // response.status == "200";
    res.send(response);
  } catch (e) {
    console.log(e.message);
  }
});

export default btcRouter;
