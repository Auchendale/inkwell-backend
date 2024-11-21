const { getAllPosts, getPostByPostID, postPost, deletePostById, patchPostById } = require("../controllers/posts.controllers");
const postRouter = require("express").Router();

postRouter
    .route("/")
    .get(getAllPosts)
    .post(postPost)

postRouter
.route("/:post_id")
.get(getPostByPostID)
.delete(deletePostById)
.patch(patchPostById)


module.exports = postRouter;
