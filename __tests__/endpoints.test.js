const data = require("../db/data/index.js");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const database = require("../db/connection.js");

beforeEach(() => {
  seed(data);
});
// afterAll(() => {
//   database.close();
// });

describe("GET /api/users", () => {
  test("GET 200 - responds with an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(response.body.users).toHaveLength(11);
      });
  });
});
