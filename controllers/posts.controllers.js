const Post = require("../models/posts.js");

exports.getAllPosts = async (request, response, next) => {
  const { limit } = request.query;
  if (limit && isNaN(Number(limit))) {
    response.status(400).send({ message: "bad request" });
  }
  try {
    const posts = await Post.find({})
      .sort("-date")
      .limit(limit ? limit : 20);
    response.status(200).send({ posts });
  } catch (error) {
    next(error);
  }
};
