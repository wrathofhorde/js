import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
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
    const video = await Video.findById(id);

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
    const file = req.file;
    const { title, description, hashtags } = req.body;
    await Video.create({
      fileUrl: file.path,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });

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

    return res.render("videos/search", { pageTitle: "Search", videos });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};
