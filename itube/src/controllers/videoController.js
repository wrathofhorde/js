import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ createdAt: "desc" })
      .populate("owner");
    // console.log(videos);
    return res.render("home", { pageTitle: "Home", videos });
  } catch (err) {
    console.log(err);
    return res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const watch = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id)
      .populate("owner")
      .populate("comments");
    console.log(video);
    if (!video) {
      return res.status(404).render("404", { pageTitle: "Video not found." });
    }

    return res.render("videos/watch", { pageTitle: video.title, video });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

export const getEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (video == null) {
      return res.status(404).render("404", { pageTitle: "Video not found." });
    }

    const userId = req.session.user._id;

    if (String(video.owner) !== String(userId)) {
      return res.status(403).redirect("/");
    }

    return res.render("videos/edit", {
      pageTitle: `Edit ${video.title}`,
      video,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

export const postEdit = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.body);
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });

    if (!video) {
      return res.status(404).render("404", { pageTitle: "Video not found." });
    }

    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });

    return res.redirect(`/videos/${id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: `Upload Video` });
};

export const postUpload = async (req, res) => {
  try {
    const {
      session: {
        user: { _id },
      },
      files: { video, thumb },
      body: { title, description, hashtags },
    } = req;
    // console.log(req.files);
    const newVideo = await Video.create({
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.status(400).render("videos/upload", {
      pageTitle: "Upload video",
      errorMessage: err._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = Video.findById(id);
    if (!video) {
      return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    const userId = req.session.user._id;
    if (String(video.owner) !== String(userId)) {
      return res.status(403).redirect("/");
    }

    await Video.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  return res.redirect("/");
};

export const search = async (req, res) => {
  try {
    let videos = [];
    const { keyword } = req.query;

    if (keyword) {
      videos = await Video.find({
        title: {
          $regex: new RegExp(`${keyword}`, "i"),
        },
      }).populate("owner");
    }

    return res.render("videos/search", { pageTitle: "Search", videos });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }

  video.meta.views = video.meta.views + 1;
  await video.save();

  return res.sendStatus(200);
};

export const addComment = async (req, res) => {
  try {
    const {
      session: { user },
      params: { id },
      body: { text },
    } = req;

    // console.log(id, text, user);

    const video = await Video.findById(id);

    if (!video) {
      return res.sendStatus(404);
    }

    const commentUser = await User.findById(user._id);
    console.log(commentUser);

    if (!commentUser) {
      return res.sendStatus(404);
    }

    const comment = await Comment.create({
      text,
      owner: user._id,
      videos: id,
    });

    video.comments.push(comment._id);
    await video.save();

    commentUser.comments.push(comment._id);
    await commentUser.save();

    res.status(201).json({ newCommentId: comment._id });
  } catch (e) {
    console.log(e);
  }
};
