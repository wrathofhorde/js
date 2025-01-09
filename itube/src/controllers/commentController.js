import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

export const removeComment = async (req, res) => {
  try {
    const {
      session: { user },
      body: { videoId, commentId },
    } = req;

    const video = await Video.findById(videoId);
    console.log(video);
    if (!video) {
      return res.sendStatus(400);
    }

    const commentUser = await User.findById(user._id);
    console.log(commentUser);
    if (!commentUser) {
      return res.sendStatus(400);
    }

    const comment = await Comment.findById(commentId);
    console.log(comment);
    if (!comment) {
      return res.sendStatus(400);
    }

    if (String(comment.owner) !== String(commentUser._id)) {
      return res.sendStatus(401);
    }

    video.comments.pull(commentId);
    await video.save();

    commentUser.comments.pull(commentId);
    await commentUser.save();

    await Comment.deleteOne(comment);

    return res.sendStatus(201);
  } catch (e) {
    console.log(e);
  }
};
