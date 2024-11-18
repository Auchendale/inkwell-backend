const mongoose = require("mongoose");
const database = require("../connection");

const postSchema = new mongoose.Schema({
  user: { type: String, required: true },
  post: { type: String, required: true },
  date: { type: Date, default: Date.now },
  cosmetics: { type: Object },
  likes: { type: Number, default: 0 },
});

const Post = mongoose.model("Post", postSchema);

const postPost = async () => {
  const data = new Post({
    user: "Kev",
    post: "I am THE Kev.",
  });
  try {
    await data.save();
  } catch (error) {
    console.log(error);
  }
};

postPost();

module.exports = Post;
