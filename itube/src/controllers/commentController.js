import Video from "../models/Video";
import Comment from "../models/Comment";

export const removeComment = async (req, res) => {
  const {
    body: { videoId, commentId },
  } = req;

  const video = await Video.findById(videoId);

  if (!video) {
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

  await Comment.deleteOne(comment);

  return res.sendStatus(201);
};
