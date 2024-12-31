import "dotenv/config";
import "./db";
import "./models/User";
import "./models/Video";
import "./models/Comment";
import serv from "./server";

const PORT = 4000;

serv.listen(PORT, () => {
  console.log(`👌 Listening on http://localhost:${PORT}`);
});
