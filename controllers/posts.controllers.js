const Post = require("../models/posts.js");
const User = require("../models/users.js");
const ObjectId = require("mongoose").Types.ObjectId;

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

exports.getPostByPostID = async (request, response, next) => {
  const { post_id } = request.params;
  if (post_id.length !== 24) {
    response.status(400).send({ message: "bad request" });
  }
  try {
    const id = new ObjectId(post_id);
    const post = await Post.findById(id);
    if (!post) {
      response.status(404).send({ message: "post does not exist" });
    } else {
      response.status(200).send({ post });
    }
  } catch (error) {
    next(error);
  }
};

exports.postPost = async (request, response, next) => {
  const { user, post } = request.body;
  if (!user || !post) {
    response.status(400).send({ message: "bad request" });
  }
  try {
    const userExists = await User.findOne({ username: user });
    if (!userExists) {
      response.status(404).send({ message: "user not found" });
    }
    const postToSave = new Post({ user, post });
    const savedPost = await postToSave.save();
    response.status(201).send({ post: postToSave });
  } catch (error) {
    next(error);
  }
};

exports.deletePostById = async (request, response, next) => {
  const { post_id } = request.params;
  if(post_id.length !== 24){
    response.status(400).send({ message: "bad request" });
  } else {
  const id = new ObjectId(post_id);
  try{
    const postToDelete = await Post.findByIdAndDelete(id)
    if(!postToDelete){
      response.status(404).send({message: "post not found"})
    }
      response.status(204).send()
  } catch (error){
    next(error)
  }
}
};
