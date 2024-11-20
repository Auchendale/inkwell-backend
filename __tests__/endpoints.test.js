const data = require("../db/data/index.js");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const database = require("../db/connection.js");
const endpoints = require("../endpoints.json");

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
  test("GET 404 - responds with an appropriate error message if the username does not exist", async () => {
    const response = await request(app)
      .get("/api/users/not-a-user")
      .expect(404);
    expect(response.body.msg).toBe("user does not exist");
  });
});
describe("GET /api", () => {
  test("GET 200 - responds with an object showing all endpoints", async () => {
    const response = await request(app).get("/api").expect(200);
    expect(response.body.endpoints).toEqual(endpoints);
  });
});
