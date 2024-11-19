const { fetchUsers } = require("../models/users.models");

const getUsers = async (request, response, next) => {
  const users = await fetchUsers();
  response.status(200).send({ users });
};

module.exports = { getUsers };
