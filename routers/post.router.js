const { getAllPosts, getPostByPostID } = require("../controllers/posts.controllers");
const postRouter = require("express").Router();

postRouter.get("/", getAllPosts);

postRouter.get("/:post_id", getPostByPostID)

module.exports = postRouter;
