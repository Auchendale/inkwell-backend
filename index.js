require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const databaseStr = process.env.DATABASE_URL;

mongoose.connect(databaseStr);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

const app = express();

app.use(express.json());

app.listen(5050, () => {
  console.log("Listening on 5050!");
});
