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

  await User.create({
    name,
    username,
    email,
    password,
    location,
  });

  res.redirect("/login");
};
export const login = (req, res) => res.render("login", { pageTitle: "Login" });
export const logout = (req, res) => res.send("Logout");
export const remove = (req, res) => res.send("Remove");
