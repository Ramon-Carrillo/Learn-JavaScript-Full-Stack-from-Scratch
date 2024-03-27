const User = require("../models/User");

const login = function () {};
const logout = function () {};

const register = function (req, res) {
  let user = new User(req.body);
  user.register();
  res.send("Thanks for trying to register");
};
const home = function (req, res) {
  res.render("home-guest");
};

module.exports = {
  login,
  logout,
  register,
  home,
};
