const Users = require("../schemas/users");
const Posts = require("../schemas/posts");
const Letters = require("../schemas/letters.js");
const { database } = require("../connection.js");

const seed = ({ userData, postsData, letterData }) => {
  database
    .dropCollection("users")
    .then(() => {
      database.dropCollection("posts");
    })
    .then(() => {
      database.dropCollection("letters");
    })
    .then(() => {
      Users.insertMany(userData);
    })
    .then(() => {
      Posts.insertMany(postsData);
    })
    .then(() => {
      Letters.insertMany(letterData);
    });
};

module.exports = seed;
