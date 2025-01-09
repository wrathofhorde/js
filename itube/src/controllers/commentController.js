import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

export const removeComment = async (req, res) => {
  const {
    session: { user },
    body: { videoId, commentId },
  } = req;

  const video = await Video.findById(videoId);

  if (!video) {
    return res.sendStatus(400);
  }

  const commentUser = await User.findById(user._id);
  console.log(commentUser);
  if (!commentUser) {
    return res.sendStatus(400);
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res.sendStatus(400);
  }

  //   console.log(video);
  //   console.log(comment);

  video.comments.pull(commentId);
  await video.save();

  commentUser.comments.pull(commentId);
  await commentUser.save();

  await Comment.deleteOne(comment);

  return res.sendStatus(201);
};
