import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/itube");

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("☠️ DB Error", err);
});

db.once("open", () => {
  console.log("👌 Connected to DB");
});
