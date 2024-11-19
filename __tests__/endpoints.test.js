const data = require("../db/data/index.js");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const database = require("../db/connection.js");

beforeEach(() => seed(data));
afterAll(async () => {
  await database.close();
});

describe("GET /api/users", () => {
  test("GET 200 - responds with an array of users", async () => {
    const response = await request(app).get("/api/users").expect(200);
    expect(response.body.users).toHaveLength(10);
  });
});
describe("GET /api/users/:username", () => {
  test("GET 200 - responds with an object containing a single user's data", async () => {
    const response = await request(app).get("/api/users/Kev").expect(200);
    expect(response.body.user.email).toEqual("kev.morel.musician@hotmail.com");
  });
});
