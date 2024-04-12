const Post = require("../models/Post");

const viewCreateScreen = (req, res) => {
  res.render("create-post");
};

const create = (req, res) => {
  let post = new Post(req.body, req.session.user._id);
  post
    .create()
    .then(() => {
      res.send("New post created.");
    })
    .catch((errors) => {
      res.send(errors);
    });
};

const viewSingle = async (req, res) => {
  try {
    let post = await Post.findSingleById(req.params.id);
    res.render("single-post-screen", { post: post });
  } catch (error) {
    res.render("404");
  }
};

module.exports = {
  viewCreateScreen,
  create,
  viewSingle,
};
