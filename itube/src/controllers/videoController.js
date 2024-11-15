const fakeUser = {
  username: "ryan",
  loggedIn: true,
};

const videos = [
  {
    title: "Raiders",
    rating: 3,
    comments: "nice movie!!",
    createdAt: "2 min ago",
    views: 38,
    id: 1,
  },
  {
    title: "Empire strikes back",
    rating: 3,
    comments: "nice movie!!",
    createdAt: "3 min ago",
    views: 23,
    id: 2,
  },
  {
    title: "Spider man",
    rating: 3,
    comments: "nice movie!!",
    createdAt: "4 min ago",
    views: 54,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", fakeUser, videos });
};
export const search = (req, res) => res.send("Search");
export const see = (req, res) => {
  const { id } = req.params;
  console.log(id);
  return res.render("watch", { pageTitle: "Watch", fakeUser });
};
