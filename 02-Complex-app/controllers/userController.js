const User = require("../models/User");

const mustBeLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.flash("errors", "You must be logged in to perform that action.");
    req.session.save(() => res.redirect("/"));
  }
};

const login = function (req, res) {
  let user = new User(req.body);
  const userLogin = async () => {
    try {
      await user.login();
      req.session.user = { avatar: user.avatar, username: user.data.username };
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

const register = async function (req, res) {
  let user = new User(req.body);
  const userRegister = async () => {
    try {
      await user.register();
      req.session.user = { username: user.data.username, avatar: user.avatar };
      req.session.save(() => res.redirect("/"));
    } catch (e) {
      req.flash("regErrors", e);
      req.session.save(() => res.redirect("/"));
    }
  };
  userRegister();
};
const home = function (req, res) {
  req.session.user
    ? res.render("home-dashboard", {
        username: req.session.user.username,
        avatar: req.session.user.avatar,
      })
    : res.render("home-guest", {
        errors: req.flash("errors"),
        regErrors: req.flash("regErrors"),
      });
};

module.exports = {
  mustBeLoggedIn,
  login,
  logout,
  register,
  home,
};
