import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  videos: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
