const Users = require("../db/schemas/users.js");

const fetchUsers = async () => {
  console.log(Users);
  const users = await Users.find({}).exec();
  console.log(users);
  return users;
};

module.exports = { fetchUsers };
