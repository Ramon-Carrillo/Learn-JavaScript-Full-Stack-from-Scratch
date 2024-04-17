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
    let post = await Post.findSingleById(req.params.id, req.visitorId);
    res.render("single-post-screen", { post: post });
  } catch (error) {
    res.render("404");
  }
};

const viewEditScreen = async function (req, res) {
  try {
    let post = await Post.findSingleById(req.params.id);
    res.render("edit-post", { post: post });
  } catch {
    res.render("404");
  }
};

const edit = function (req, res) {
  let post = new Post(req.body, req.visitorId, req.params.id);
  post
    .update()
    .then((status) => {
      // the post was successfully updated in the database
      // or user did have permission, but there were validation errors
      if (status == "success") {
        // post was updated in db
        req.flash("success", "Post successfully updated.");
        req.session.save(function () {
          res.redirect(`/post/${req.params.id}/edit`);
        });
      } else {
        post.errors.forEach(function (error) {
          req.flash("errors", error);
        });
        req.session.save(function () {
          res.redirect(`/post/${req.params.id}/edit`);
        });
      }
    })
    .catch(() => {
      // A post with the requested ID doesn't exist
      // or if the current visitor is not the owner of the requested post
      req.flash("errors", "You do not have permission to perform that action.");
      req.session.save(() => res.redirect("/"));
    });
};

module.exports = {
  viewCreateScreen,
  create,
  viewSingle,
  viewEditScreen,
  edit,
};
