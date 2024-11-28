import bcrypt from "bcrypt";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const { email, username, name, password, password2, location } = req.body;

  if (password != +password2) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation is not matched",
    });
  }

  const exists = await User.exists({ $or: [{ email }, { username }] });

  if (exists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This email/username is alread used",
    });
  }

  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: err._message,
    });
  }

  res.redirect("/login");
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const errorMessage = "Account Error";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", { pageTitle, errorMessage });
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return res.status(400).render("login", { pageTitle, errorMessage });
  }

  req.session.user = user;
  req.session.loggedIn = true;

  console.log("login successful");
  res.redirect("/");
};

export const logout = (req, res) => {
  req.session.loggedIn = false;
  res.redirect("/");
};
export const remove = (req, res) => res.send("Remove");
