const testData = require("../db/data/test/index.js");
const request = require("supertest");
const { app } = require("../db/index.js");

beforeAll(() => {
  seed(testData);
});
