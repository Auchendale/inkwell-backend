const data = require("../db/data/index.js");
const request = require("supertest");
const { app } = require("../db/connection.js");

beforeAll(() => {
  seed(data);
});
