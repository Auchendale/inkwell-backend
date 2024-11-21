const { getAllPosts, getPostByPostID, postPost } = require("../controllers/posts.controllers");
const postRouter = require("express").Router();

postRouter
    .route("/")
    .get(getAllPosts)
    .post(postPost)

postRouter.get("/:post_id", getPostByPostID)

module.exports = postRouter;
