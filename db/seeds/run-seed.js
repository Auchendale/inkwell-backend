const seed = require("./seed");
const data = require("../data/index");
const { database } = require("../connection");

seed(data);
