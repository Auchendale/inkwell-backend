const Users = require("../db/schemas/users.js");
const database = require("../db/connection.js");

const fetchUsers = async () => {
  try {
    const usersAwait = await Users.find({});
    console.log(usersAwait);
    return usersAwait;
  } catch (error) {
    return error;
  }
};

module.exports = { fetchUsers };
