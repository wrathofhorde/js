import morgan from "morgan";
import express from "express";
import { ethers } from "ethers";
import path from "path";
import { fileURLToPath } from "url";

const port = 4000;
const app = express();
const dirname = fileURLToPath(new URL(".", import.meta.url));

app.use(express.static(path.join(dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`Running on http://localhost:${port} `);
});

app.post("/verify/account", async (req, res) => {
  // console.log(req.body);
  const { address, message, signature } = req.body;

  const recoveredAddress = ethers.verifyMessage(message, signature);
  const isValid = recoveredAddress.toLowerCase() === address.toLowerCase();

  console.log("Recovered Address:", recoveredAddress);
  console.log("Provided Address:", address);
  console.log("Signature Valid:", isValid);

  return res.json({ isValid });
});

app.use("/", (req, res) => {
  res.sendFile(path.join(dirname, "./public/index.html"));
});
