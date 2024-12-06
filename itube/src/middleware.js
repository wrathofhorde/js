import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "iTube";
  res.locals.user = req.session.user || {};
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  // console.log("locals", res.locals);
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const videoUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 100000000 },
});

export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 3000000 },
});
