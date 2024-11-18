const Users = require("../schemas/users");
const Posts = require("../schemas/posts");
const Letters = require("../schemas/letters.js");
const { database } = require("../connection.js");

const seed = ({ usersData, postsData, lettersData }) => {
  // console.log(postsData, "<< posts");
  return database
    .dropCollection("users")
    .then(() => {
      database.dropCollection("posts");
    })
    .then(() => {
      database.dropCollection("letters");
    })
    .then(() => {
      Users.insertMany(usersData);
    })
    .then(() => {
      console.log(postsData);
      Posts.insertMany(postsData);
    })
    .then(() => {
      Letters.insertMany(lettersData);
    })
    .then(() => {
      // database.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = seed;
