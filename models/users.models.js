const Users = require("../db/schemas/users.js");
const database = require("../db/connection.js");

const fetchUsers = async () => {
  const users = await Users.find();
  return users;
};

module.exports = { fetchUsers };
