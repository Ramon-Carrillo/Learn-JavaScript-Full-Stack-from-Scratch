const User = require("../models/User");

const login = function (req, res) {
  let user = new User(req.body);
  const userLogin = async () => {
    try {
      await user.login();
      res.send("You are now logged in");
    } catch (e) {
      res.send(e);
    }
  };
  userLogin();
};
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
