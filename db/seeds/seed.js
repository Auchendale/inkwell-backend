const Users = require("../schemas/users");
const Posts = require("../schemas/posts");
const Letters = require("../schemas/letters.js");
const database = require("../connection.js");

const seed = async ({ usersData, postsData, lettersData }) => {
  try {
    await database.dropCollection("users");
    await database.dropCollection("posts");
    await database.dropCollection("letters");
    await Users.insertMany(usersData);
    await Posts.insertMany(postsData);
    await Letters.insertMany(lettersData);
  } catch (error) {
    console.log(error);
  } finally {
    database.close();
  }
};

module.exports = seed;
