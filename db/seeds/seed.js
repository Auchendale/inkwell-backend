const Users = require("../../models/users.js");
const Posts = require("../../models/posts.js");
const Letters = require("../../models/letters.js");
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
  }
};

module.exports = seed;
