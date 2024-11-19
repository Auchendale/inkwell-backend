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
    expect(response.body.users).toHaveLength(11);
  });
});
