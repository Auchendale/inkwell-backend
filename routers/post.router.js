const { getAllPosts } = require("../controllers/posts.controllers");
const postRouter = require("express").Router();

postRouter.get("/", getAllPosts);

module.exports = postRouter;
