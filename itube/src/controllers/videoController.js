export const trending = (req, res) => res.render("home", { pageTitle: "Home" });
export const search = (req, res) => res.send("Search");
export const watch = (req, res) => res.render("watch", { pageTitle: "Watch" });
