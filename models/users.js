const mongoose = require("mongoose");
const database = require("../db/connection");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  user_icon_url: { type: String },
  friends: { type: Array, default: [] },
  location: {
    country: { type: String },
    lat: { type: Number },
    long: { type: Number },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
