const { getAllPosts, getPostByPostID, postPost, deletePostById } = require("../controllers/posts.controllers");
const postRouter = require("express").Router();

postRouter
    .route("/")
    .get(getAllPosts)
    .post(postPost)

postRouter
.route("/:post_id")
.get(getPostByPostID)
.delete(deletePostById)


module.exports = postRouter;
