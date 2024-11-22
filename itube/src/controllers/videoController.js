import Video from "../models/Video";
import videoRouter from "../routers/videoRouter";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    console.log(videos);
    return res.render("home", { pageTitle: "Home", videos });
  } catch (err) {
    console.log(err);
    return res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const watch = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.render("404", { pageTitle: "Video not found." });
    }

    return res.render("watch", { pageTitle: video.title, video });
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
      return res.render("404", { pageTitle: "Video not found." });
    }

    return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};

export const postUpload = async (req, res) => {
  try {
    const { title, description, hashtags } = req.body;
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });

    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.render("upload", {
      pageTitle: "Upload video",
      errorMessage: err._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
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
      });
    }

    return res.render("search", { pageTitle: "Search", videos });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};
