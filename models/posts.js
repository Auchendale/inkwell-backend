const mongoose = require("mongoose");
const database = require("../db/connection");

const postSchema = new mongoose.Schema({
  user: { type: String, required: true },
  post: { type: String, required: true },
  date: { type: Date, default: Date.now },
  cosmetics: { type: Object },
  likes: { type: Number, default: 0 },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
