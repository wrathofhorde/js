const fakeUser = {
  username: "ryan",
  loggedIn: true,
};

export const trending = (req, res) => {
  const videos = [
    {
      title: "Raiders",
    },
    {
      title: "Empire strikes back",
    },
    {
      title: "Spider man",
    },
  ];

  return res.render("home", { pageTitle: "Home", fakeUser, videos });
};
export const search = (req, res) => res.send("Search");
export const watch = (req, res) => res.render("watch", { pageTitle: "Watch" });
