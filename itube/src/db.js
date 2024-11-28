import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("☠️ DB Error", err);
});

db.once("open", () => {
  console.log("👌 Connected to DB");
});
