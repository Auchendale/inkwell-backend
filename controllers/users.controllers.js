const Users = require("../models/users.js");

const getUsers = async (request, response, next) => {
  const users = await Users.find();
  response.status(200).send({ users });
};

const getUserByUsername = async (request, response, next) => {
  const { username } = request.params;
  const user = await Users.findOne({ username });
  response.status(200).send({ user });
};

module.exports = { getUsers, getUserByUsername };
