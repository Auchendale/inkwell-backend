require("dotenv").config();
const express = require("express");
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
const app = express();

app.use(express.json());

app.listen(5050, (err) => {
  if (err) console.log(err);
});

module.exports = { database, app };
