export const sessionMiddleware = (req, res, next) => {
  res.locals.siteName = "iTube";
  res.locals.user = req.session.user;
  res.locals.loggedIn = req.session.loggedIn;
  // console.log(res.locals);
  next();
};
