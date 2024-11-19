require("dotenv").config();
const mongoose = require("mongoose");

const databaseStr = process.env.DATABASE_URL;
const options = {
  dbName: "development",
};

if (process.env.NODE_ENV) {
  options.dbName = process.env.NODE_ENV;
}
mongoose.connect(databaseStr, options);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

module.exports = database;
