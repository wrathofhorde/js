import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
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

    return res.render("watch", { pageTitle: video.title, video });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};

export const postUpload = async (req, res) => {
  try {
    const { title, description, hashtags } = req.body;
    const video = new Video({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });

    await video.save();
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.render("upload", {
      pageTitle: "Upload video",
      errorMessage: err._message,
    });
  }
};
