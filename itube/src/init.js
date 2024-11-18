import "./db";
import "./models/Video";
import serv from "./server";

const PORT = 4000;

serv.listen(PORT, () => {
  console.log(`👌 Listening on http://localhost:${PORT}`);
});
