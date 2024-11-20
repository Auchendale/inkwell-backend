const User = require("../models/users.js");

const getUsers = async (request, response, next) => {
  const users = await User.find();
  response.status(200).send({ users });
};

const getUserByUsername = async (request, response, next) => {
  const { username } = request.params;
  const user = await User.findOne({ username });
  if (!user) response.status(404).send({ msg: "user does not exist" });
  else response.status(200).send({ user });
};

module.exports = { getUsers, getUserByUsername };
