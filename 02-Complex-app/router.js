const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");
const followController = require("./controllers/followController");

// User related routes
router.get("/", userController.home);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/doesUsernameExist", userController.doesUsernameExist);
router.post("/doesEmailExist", userController.doesEmailExist);

// Post related routes
router.get(
  "/create-post",
  userController.mustBeLoggedIn,
  postController.viewCreateScreen
);
router.post(
  "/create-post",
  userController.mustBeLoggedIn,
  postController.create
);
router.get("/post/:id", postController.viewSingle);
router.get(
  "/post/:id/edit",
  userController.mustBeLoggedIn,
  postController.viewEditScreen
);
router.post(
  "/post/:id/edit",
  userController.mustBeLoggedIn,
  postController.edit
);
router.post(
  "/post/:id/delete",
  userController.mustBeLoggedIn,
  postController.deletePost
);

router.post("/search", postController.search);

// Profile related routes
router.get(
  "/profile/:username",
  userController.ifUserExists,
  userController.sharedProfileData,
  userController.profilePostsScreen
);

router.get(
  "/profile/:username/followers",
  userController.ifUserExists,
  userController.sharedProfileData,
  userController.profileFollowersScreen
);

router.get(
  "/profile/:username/following",
  userController.ifUserExists,
  userController.sharedProfileData,
  userController.profileFollowingScreen
);

// Follow related routes
router.post(
  "/addFollow/:username",
  followController.addFollow,
  userController.mustBeLoggedIn
);

router.post(
  "/removeFollow/:username",
  followController.removeFollow,
  userController.mustBeLoggedIn
);

module.exports = router;
