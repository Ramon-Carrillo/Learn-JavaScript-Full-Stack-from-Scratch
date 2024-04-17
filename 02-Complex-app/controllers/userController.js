const User = require("../models/User");
const Post = require("../models/Post");

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
      req.session.user = {
        avatar: user.avatar,
        username: user.data.username,
        _id: user.data._id,
      };
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
      req.session.user = {
        username: user.data.username,
        avatar: user.avatar,
        _id: user.data._id,
      };
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
    ? res.render("home-dashboard")
    : res.render("home-guest", {
        regErrors: req.flash("regErrors"),
      });
};

const ifUserExists = function (req, res, next) {
  User.findByUsername(req.params.username)
    .then(function (userDocument) {
      req.profileUser = userDocument;
      next();
    })
    .catch(function () {
      res.render("404");
    });
};

const profilePostsScreen = function (req, res) {
  // Ask our post model for posts by a certain author id
  Post.findByAuthorId(req.profileUser._id)
    .then(function (posts) {
      res.render("profile", {
        posts: posts,
        profileUsername: req.profileUser.username,
        profileAvatar: req.profileUser.avatar,
      });
    })
    .catch(function () {
      res.render("404");
    });
};

module.exports = {
  mustBeLoggedIn,
  login,
  logout,
  register,
  home,
  ifUserExists,
  profilePostsScreen,
};
