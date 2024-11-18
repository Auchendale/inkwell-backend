const mongoose = require("mongoose");
const database = require("../index");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  user_icon_url: { type: String },
  friends: { type: Array, default: [] },
  country: { type: String, required: true },
  location: {
    country: { type: String },
    lat: { type: Number },
    long: { type: Number },
  },
});

const User = mongoose.model("User", userSchema);

const postUser = async () => {
  const data = new User({
    username: "Kev",
    email: "kevmorel@mastermusician.com",
    country: "England",
  });
  try {
    await data.save();
  } catch (error) {
    console.log(error);
  }
};

postUser();

module.exports = User;
