const User = require("../models/User");

const login = function (req, res) {
  let user = new User(req.body);
  const userLogin = async () => {
    try {
      await user.login();
      req.session.user = { username: user.data.username };
      req.session.save(() => res.redirect("/"));
    } catch (e) {
      req.flash("errors", e);
      req.session.save(() => res.redirect("/"));
    }
  };
  userLogin();
};
const logout = function (req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const register = function (req, res) {
  let user = new User(req.body);
  user.register();
  res.send("Thanks for register");
};
const home = function (req, res) {
  req.session.user
    ? res.render("home-dashboard", { username: req.session.user.username })
    : res.render("home-guest", { errors: req.flash("errors") });
};

module.exports = {
  login,
  logout,
  register,
  home,
};
