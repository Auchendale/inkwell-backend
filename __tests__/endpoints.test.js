const data = require("../db/data/index.js");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const database = require("../db/connection.js");
const endpoints = require("../endpoints.json");
const getLetterId = require("../utils/get-letter-id.js");

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
    expect(response.body.message).toBe("user does not exist");
  });
});
describe("GET /api", () => {
  test("GET 200 - responds with an object showing all endpoints", async () => {
    const response = await request(app).get("/api").expect(200);
    expect(response.body.endpoints).toEqual(endpoints);
  });
});
describe("ALL /notAnEndpoint", () => {
  test("GET 404 - responds with not found", async () => {
    const response = await request(app).get("/api/notURL").expect(404);
    expect(response.body.message).toBe("not found");
  });
});
describe("GET /letters/:letter_id", () => {
  test("GET 200 - responds with an image file", async () => {
    const id = await getLetterId();
    const response = await request(app).get(`/api/letters/${id}`).expect(200);
    expect(response.body.letter.content).toEqual({
      letter:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
    });
  });
  test("GET 400 - responds with bad request when given an invalid ID", async () => {
    const response = await request(app).get(`/api/letters/99999`).expect(400);
    expect(response.body.message).toBe("bad request");
  });
  test("GET 404 - responds with letter not found when given an id for a letter that does not exist", async () => {
    const response = await request(app)
      .get(`/api/letters/999999999999999999999999`)
      .expect(404);
    expect(response.body.message).toBe("letter does not exist");
  });
});
describe("POST /api/letters", () => {
  test("POST 201 - adds letter to database and returns sent letter ", async () => {
    const testLetter = {
      sender: "kieran",
      recipient: "Clara",
      content: {letter: "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg"}
    }
    const response = await request(app).post(`/api/letters`).expect(201).send(testLetter)
    expect(response.body.letter).toHaveProperty("sender", "kieran")
    expect(response.body.letter).toHaveProperty("recipient", "Clara")
    expect(response.body.letter).toHaveProperty("content", {letter: "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg"})
  })
  test("POST 201 - ignores superfluous information sent on object", async () => {
    const testLetter = {
      sender: "kieran",
      recipient: "Clara",
      content: {letter: "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg"},
      ringsAndWibs: false
    }
    const response = await request(app).post(`/api/letters`).expect(201).send(testLetter)
    expect(response.body.letter).toHaveProperty("sender", "kieran")
    expect(response.body.letter).toHaveProperty("recipient", "Clara")
    expect(response.body.letter).toHaveProperty("content", {letter: "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg"})
    
  })
  test("POST 400 - responds with a bad request if sender, recipient, or content are not given", async () => {
    const testLetter = {
      recipient: "kieran",
      content: {letter: "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg"}
    }
    const response = await request(app).post(`/api/letters`).expect(400).send(testLetter)
    expect(response.body.message).toBe("bad request");
  })
  test("POST 404 - responds with a bad request if sender does not exist", async () => {
    const testLetter = {
      sender: "daz",
      recipient: "kieran",
      content: {letter: "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg"}
    }
    const response = await request(app).post(`/api/letters`).expect(404).send(testLetter)
    expect(response.body.message).toBe("sender or recipient are not users");
  })
})
describe("GET /api/letters/user/:recipient", () => {
  test("200 - responds with an array containing letter objects", async () => {
    const response = await request(app).get(`/api/letters/user/sam`).expect(200)
    expect(response.body.letters).toHaveLength(1)
  })
  test("404 - responds with an appropriate error message if the username does not exist", async () => {
    const response = await request(app).get(`/api/letters/user/fay`).expect(404)
    expect(response.body.message).toBe("user does not exist");
  })
})
