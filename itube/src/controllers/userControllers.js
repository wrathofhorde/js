import bcrypt from "bcrypt";
import User from "../models/User";

export const getJoin = (req, res) => {
  try {
    res.render("users/join", { pageTitle: "Join" });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

export const postJoin = async (req, res) => {
  try {
    const { email, username, name, password, password2, location } = req.body;

    if (password !== password2) {
      return res.status(400).render("users/join", {
        pageTitle: "Join",
        errorMessage: "Password confirmation is not matched",
      });
    }

    const exists = await User.exists({ $or: [{ email }, { username }] });

    if (exists) {
      return res.status(400).render("users/join", {
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
  } catch (err) {
    console.log(err);
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: err._message,
    });
  }

  res.redirect("/login");
};

export const getLogin = (req, res) => {
  try {
    res.render("users/login", { pageTitle: "Login" });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

export const postLogin = async (req, res) => {
  try {
    const pageTitle = "Login";
    const errorMessage = "Account Error";
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).render("users/login", { pageTitle, errorMessage });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(400).render("users/login", { pageTitle, errorMessage });
    }

    req.session.user = user;
    req.session.loggedIn = true;

    console.log("login successful");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

export const logout = (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

export const getEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  try {
    const {
      session: {
        user: { _id },
      },
      body: { name, username, email, location },
      file,
    } = req;

    const updated = {};
    if (name !== req.session.user.name) {
      updated.name = name;
    }
    if (email !== req.session.user.email) {
      updated.email = email;
    }
    if (username !== req.session.user.username) {
      updated.username = username;
    }
    if (location !== req.session.user.location) {
      updated.location = location;
    }
    if (file) {
      updated.avatarUrl = file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        ...updated,
      },
      { new: true }
    );

    // console.log("updatedUser", updatedUser);
    // req.session.user = {
    //   email,
    //   user,
    //   username,
    //   location,
    //   ...req.session.user,
    // };

    req.session.user = updatedUser;

    return res.redirect("/users/edit");
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

export const getChangePassword = (req, res) => {
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  try {
    const {
      session: {
        user: { _id },
      },
      body: { oldPassword, newPassword, confirmPassword },
    } = req;

    const user = await User.findById(_id);
    const matched = await bcrypt.compare(oldPassword, user.password);

    if (!matched || newPassword !== confirmPassword) {
      return res.status(400).render("users/change-password", {
        pageTitle: "Change Password",
        errorMessage: "Change Password Error!",
      });
    }

    user.password = newPassword;
    await user.save();

    return res.redirect("logout");
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).render("404", { pageTitle: "User Not Found" });
  }
  // console.log(user);
  return res.render("users/profile", {
    pageTitle: `${user.name}`,
    user,
  });
};

export const remove = (req, res) => res.send("Remove");
