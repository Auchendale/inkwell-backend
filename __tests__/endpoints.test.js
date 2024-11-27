const data = require("../db/data/index.js");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const database = require("../db/connection.js");
const endpoints = require("../endpoints.json");
const { getItemID } = require("../utils/get-item-id.js");
const Letter = require("../models/letters.js");
const Post = require("../models/posts.js");

beforeEach(() => seed(data));
afterAll(async () => {
  await database.close();
});

describe("GET /api/users", () => {
  test("GET 200 - responds with an array of users", async () => {
    const response = await request(app).get("/api/users").expect(200);
    expect(response.body.users).toHaveLength(9);
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
    const id = await getItemID(Letter);
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
      content: {
        letter:
          "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
      },
    };
    const response = await request(app)
      .post(`/api/letters`)
      .expect(201)
      .send(testLetter);
    expect(response.body.letter).toHaveProperty("sender", "kieran");
    expect(response.body.letter).toHaveProperty("recipient", "Clara");
    expect(response.body.letter).toHaveProperty("content", {
      letter:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
    });
  });
  test("POST 201 - ignores superfluous information sent on object", async () => {
    const testLetter = {
      sender: "kieran",
      recipient: "Clara",
      content: {
        letter:
          "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
      },
      ringsAndWibs: false,
    };
    const response = await request(app)
      .post(`/api/letters`)
      .expect(201)
      .send(testLetter);
    expect(response.body.letter).toHaveProperty("sender", "kieran");
    expect(response.body.letter).toHaveProperty("recipient", "Clara");
    expect(response.body.letter).toHaveProperty("content", {
      letter:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
    });
  });
  test("POST 400 - responds with a bad request if sender, recipient, or content are not given", async () => {
    const testLetter = {
      recipient: "kieran",
      content: {
        letter:
          "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
      },
    };
    const response = await request(app)
      .post(`/api/letters`)
      .expect(400)
      .send(testLetter);
    expect(response.body.message).toBe("bad request");
  });
  test("POST 404 - responds with a not found if sender does not exist", async () => {
    const testLetter = {
      sender: "daz",
      recipient: "kieran",
      content: {
        letter:
          "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
      },
    };
    const response = await request(app)
      .post(`/api/letters`)
      .expect(404)
      .send(testLetter);
    expect(response.body.message).toBe("sender or recipient are not users");
  });
});
describe("GET /api/letters", () => {
  test("GET 200 - responds with an array of all letters", async () => {
    const response = await request(app).get("/api/letters").expect(200);
    expect(response.body.letters).toHaveLength(6);
  });
  describe("Queries for endpoint", () => {
    test("GET 200 - sender query", async () => {
      const response = await request(app)
        .get("/api/letters?sender=kieran")
        .expect(200);
      expect(response.body.letters).toHaveLength(2);
    });
    test("GET 200 - recipient query", async () => {
      const response = await request(app)
        .get("/api/letters?recipient=kieran")
        .expect(200);
      expect(response.body.letters).toHaveLength(1);
    });
    test("GET 404 - returns 404 if sender or recipient not an existing user", async () => {
      const response = await request(app)
        .get("/api/letters?recipient=not-a-user")
        .expect(404);
      expect(response.body.message).toBe("user not found");
      const responseSender = await request(app)
        .get("/api/letters?sender=not-a-user")
        .expect(404);
      expect(responseSender.body.message).toBe("user not found");
    });
    test("GET 200 - works with multiple queries", async () => {
      const response = await request(app)
        .get("/api/letters?sender=sam&recipient=oscar")
        .expect(200);
      expect(response.body.letters).toHaveLength(1);
    });
    test("GET 200 - sort_by query", async () => {
      const response = await request(app)
        .get("/api/letters?sort_by=date_sent")
        .expect(200);
      expect(response.body.letters).toBeSortedBy("date_sent", {
        descending: true,
      });
    });
    test("GET 400 - sort_by query responds with bad request of trying to sort by a field that does not exist ", async () => {
      const response = await request(app)
        .get("/api/letters?sort_by=not-a-field")
        .expect(400);
      expect(response.body.message).toBe("bad request");
    });
    test("GET 200 - order query", async () => {
      const response = await request(app)
        .get("/api/letters?sort_by=date_sent&order=asc")
        .expect(200);
      expect(response.body.letters).toBeSortedBy("date_sent", {
        descending: false,
      });
    });
    test("GET 400 - returns bad request if order does not equal 'asc' or 'desc'", async () => {
      const response = await request(app)
        .get("/api/letters?sort_by=date_sent&order=invalid")
        .expect(400);
      expect(response.body.message).toBe("bad request");
    });
    test("GET 200 - is_opened query", async () => {
      const response = await request(app)
        .get("/api/letters?is_opened=false")
        .expect(200);
      expect(response.body.letters).toHaveLength(3);
    });
    test("GET 400 - returns bad request if is_opened does not equal 'true' or 'false'", async () => {
      const response = await request(app)
        .get("/api/letters?is_opened=invalid")
        .expect(400);
      expect(response.body.message).toBe("bad request");
    });
    test("GET 200 - is_saved query", async () => {
      const response = await request(app)
        .get("/api/letters?is_saved=false")
        .expect(200);
      expect(response.body.letters).toHaveLength(4);
    });
    test("GET 400 - returns bad request if is_saved does not equal 'true' or 'false'", async () => {
      const response = await request(app)
        .get("/api/letters?is_saved=invalid")
        .expect(400);
      expect(response.body.message).toBe("bad request");
    });
  });
});
describe("GET /api/posts", () => {
  test("GET 200 - responds with an array of all posts", async () => {
    const response = await request(app).get("/api/posts?limit=100").expect(200);
    expect(response.body.posts).toHaveLength(40);
  });
  test("GET 200 - results are sorted by dates in descending order", async () => {
    const response = await request(app).get("/api/posts").expect(200);
    expect(response.body.posts).toBeSortedBy("date", { descending: true });
  });
  test("GET 200 - responds with the default limit of 20", async () => {
    const response = await request(app).get("/api/posts").expect(200);
    expect(response.body.posts).toHaveLength(20);
  });
  describe("Query for post endpoint", () => {
    test("GET 200 - accepts the query number limit given", async () => {
      const response = await request(app).get("/api/posts?limit=5").expect(200);
      expect(response.body.posts).toHaveLength(5);
    });
    test("GET 400 - returns bad request if limit is not a number", async () => {
      const response = await request(app)
        .get("/api/posts?limit=notANumber")
        .expect(400);
      expect(response.body.message).toBe("bad request");
    });
  });
});
describe("GET /api/posts/:post_id", () => {
  test("GET 200 - responds with the corresponding post", async () => {
    const id = await getItemID(Post);
    const response = await request(app).get(`/api/posts/${id}`).expect(200);
    expect(response.body.post.post).toEqual("I am the Kev");
  });
  test("GET 400 - responds with bad request when given an invalid ID", async () => {
    const response = await request(app).get(`/api/posts/99999`).expect(400);
    expect(response.body.message).toBe("bad request");
  });
  test("GET 404 - responds with post not found when given an id for a post that does not exist", async () => {
    const response = await request(app)
      .get(`/api/posts/999999999999999999999999`)
      .expect(404);
    expect(response.body.message).toBe("post does not exist");
  });
});
describe("POST /api/posts", () => {
  test("POST 201 - adds post to database and returns sent post", async () => {
    const newPost = {
      user: "charlie",
      post: "this is a new post",
    };
    const response = await request(app)
      .post("/api/posts")
      .send(newPost)
      .expect(201);
    expect(response.body.post).toHaveProperty("user", "charlie");
    expect(response.body.post).toHaveProperty("post", "this is a new post");
  });
  test("POST 201 - ignores superfluous information sent on body", async () => {
    const newPost = {
      user: "charlie",
      post: "this is a new post",
      additional: "information",
      ignorable: true,
    };
    const response = await request(app)
      .post("/api/posts")
      .send(newPost)
      .expect(201);
    expect(response.body.post).toHaveProperty("user", "charlie");
    expect(response.body.post).toHaveProperty("post", "this is a new post");
  });
  test("POST 400 - responds with bad request if missing user or post", async () => {
    const newPost = {
      post: "this is a new post",
    };
    const response = await request(app)
      .post("/api/posts")
      .send(newPost)
      .expect(400);
    expect(response.body.message).toBe("bad request");
  });
  test("POST 400 - responds with not found if user does not exist", async () => {
    const newPost = {
      user: "not-a-user",
      post: "this is a new post",
    };
    const response = await request(app)
      .post("/api/posts")
      .send(newPost)
      .expect(404);
    expect(response.body.message).toBe("user not found");
  });
});
describe("DELETE /api/letters/:letter_id", () => {
  test("DELETE 204 deletes the specified letter", async () => {
    const id = await getItemID(Letter);
    const response = await request(app)
      .delete(`/api/letters/${id}`)
      .expect(204);
    const allLetters = await Letter.find({});
    expect(allLetters).toHaveLength(5);
  });
  test("DELETE 404 returns not found if valid id that doesn't exist is given", async () => {
    const response = await request(app)
      .delete(`/api/letters/999999999999999999999999`)
      .expect(404);
    expect(response.body.message).toBe("letter not found");
  });
  test("DELETE 400 returns bad request if invalid id is given", async () => {
    const response = await request(app)
      .delete(`/api/letters/not-an-id`)
      .expect(400);
    expect(response.body.message).toBe("bad request");
  });
});
describe("DELETE /api/posts/:post", () => {
  test("DELETE 204 deletes the specified post", async () => {
    const id = await getItemID(Post);
    const response = await request(app).delete(`/api/posts/${id}`).expect(204);
    const allPosts = await Post.find({});
    expect(allPosts).toHaveLength(39);
  });
  test("DELETE 404 returns not found if valid id that doesn't exist is given", async () => {
    const response = await request(app)
      .delete(`/api/posts/999999999999999999999999`)
      .expect(404);
    expect(response.body.message).toBe("post not found");
  });
  test("DELETE 400 returns bad request if invalid id is given", async () => {
    const response = await request(app)
      .delete(`/api/posts/not-an-id`)
      .expect(400);
    expect(response.body.message).toBe("bad request");
  });
});
describe("PATCH /api/posts/:post_id", () => {
  test("PATCH 200 increments the like count of a post by the given amount", async () => {
    const patchRequest = { likes: 3 };
    const id = await getItemID(Post);
    const response = await request(app)
      .patch(`/api/posts/${id}`)
      .send(patchRequest)
      .expect(200);
    expect(response.body.post.likes).toBe(3);
  });
  test("PATCH 200 works with negative numbers", async () => {
    const patchRequest = { likes: -1 };
    const id = await getItemID(Post);
    const response = await request(app)
      .patch(`/api/posts/${id}`)
      .send(patchRequest)
      .expect(200);
    expect(response.body.post.likes).toBe(-1);
  });
  test("PATCH 200 ignores superfluous information", async () => {
    const patchRequest = { likes: -1, comments: "wow" };
    const id = await getItemID(Post);
    const response = await request(app)
      .patch(`/api/posts/${id}`)
      .send(patchRequest)
      .expect(200);
    expect(response.body.post.likes).toBe(-1);
  });
  test("PATCH 400 returns bad request if likes is not sent on request", async () => {
    const patchRequest = {};
    const id = await getItemID(Post);
    const response = await request(app)
      .patch(`/api/posts/${id}`)
      .send(patchRequest)
      .expect(400);
    expect(response.body.message).toBe("bad request");
  });
  test("PATCH 400 returns bad request if likes is not a number", async () => {
    const patchRequest = { likes: "five" };
    const id = await getItemID(Post);
    const response = await request(app)
      .patch(`/api/posts/${id}`)
      .send(patchRequest)
      .expect(400);
    expect(response.body.message).toBe("bad request");
  });
  test("PATCH 400 returns bad request if given an invalid id", async () => {
    const patchRequest = { likes: 1 };
    const response = await request(app)
      .patch(`/api/posts/not-an-id`)
      .send(patchRequest)
      .expect(400);
    expect(response.body.message).toBe("bad request");
  });
  test("PATCH 404 returns not found if given a valid id for a post that doesn't exist", async () => {
    const patchRequest = { likes: 1 };
    const response = await request(app)
      .patch(`/api/posts/999999999999999999999999`)
      .send(patchRequest)
      .expect(404);
    expect(response.body.message).toBe("post not found");
  });
});
describe("PATCH /api/users/:username", () => {
  test("PATCH 200 - adds a friend to the friend array and returns the updated user object (defaults to adding friend if not specified)", async () => {
    const patchRequest = { friend: "Kev" };
    const response = await request(app)
      .patch("/api/users/B.Aldeegull")
      .send(patchRequest)
      .expect(200);
    expect(response.body.user.friends).toEqual(["charlie", "Kev"]);
  });
  test("PATCH 200 - removes a friend from the friend array and returns the updated user object if requested to remove", async () => {
    const patchRequest = { friend: "kieran", remove: true };
    const response = await request(app)
      .patch("/api/users/sam")
      .send(patchRequest)
      .expect(200);
    expect(response.body.user.friends).toEqual(["oscar", "LailaStarr"]);
  });
  test("PATCH 200 - ignores superfluous information on the patch request object", async () => {
    const patchRequest = { friend: "Kev", best: "true" };
    const response = await request(app)
      .patch("/api/users/B.Aldeegull")
      .send(patchRequest)
      .expect(200);
    expect(response.body.user.friends).toEqual(["charlie", "Kev"]);
  });
  test("PATCH 400 - returns bad request if you try to add a friend already on the list", async () => {
    const patchRequest = { friend: "kieran" };
    const response = await request(app)
      .patch("/api/users/sam")
      .send(patchRequest)
      .expect(400);
    expect(response.body.message).toBe("user is already friend");
  });
  test("PATCH 400 - returns bad request if you try to remove a friend who is not on the list", async () => {
    const patchRequest = { friend: "charlie", remove: true };
    const response = await request(app)
      .patch("/api/users/sam")
      .send(patchRequest)
      .expect(400);
    expect(response.body.message).toBe("user is not friend");
  });
  test("PATCH 404 - returns not found if you try to add or remove a user who does not exist", async () => {
    const patchRequest = { friend: "not-a-user", remove: true };
    const response = await request(app)
      .patch("/api/users/sam")
      .send(patchRequest)
      .expect(404);
    expect(response.body.message).toBe("user not found");
  });
  test("PATCH 404 - returns not found if you try to add or remove a friend for a user who does not exist", async () => {
    const patchRequest = { friend: "Kev" };
    const response = await request(app)
      .patch("/api/users/not-a-user")
      .send(patchRequest)
      .expect(404);
    expect(response.body.message).toBe("user not found");
  });
  test("PATCH 400 - returns bad request if patch request is sent without friend key", async () => {
    const patchRequest = { remove: true };
    const response = await request(app)
      .patch("/api/users/sam")
      .send(patchRequest)
      .expect(400);
    expect(response.body.message).toBe("bad request");
  });
  test("PATCH 400 - returns bad request if user is added as friend", async () => {
    const patchRequest = { friend: "sam" };
    const response = await request(app)
      .patch("/api/users/sam")
      .send(patchRequest)
      .expect(400);
    expect(response.body.message).toBe("bad request");
  });
});
describe("PATCH /api/letters/:letter_id", () => {
  test("PATCH 200 - changes booleans to be read", async () => {
    const patchRequest = { is_opened: true };
    const id = await getItemID(Letter);
    const response = await request(app)
      .patch(`/api/letters/${id}`)
      .send(patchRequest)
      .expect(200);
    expect(response.body.letter.is_opened).toBe(true);
  });
  test("PATCH 200 - ignores superfluous information", async () => {
    const patchRequest = { is_opened: true, skoo: "da bat" };
    const id = await getItemID(Letter);
    const response = await request(app)
      .patch(`/api/letters/${id}`)
      .send(patchRequest)
      .expect(200);
    expect(response.body.letter.is_opened).toBe(true);
  });
  test("PATCH 400 - returns bad request if booleans are not sent", async () => {
    const patchRequest = { skoo: "da bat" };
    const id = await getItemID(Letter);
    const response = await request(app)
      .patch(`/api/letters/${id}`)
      .send(patchRequest)
      .expect(400);
    expect(response.body.message).toBe("bad request");
  });
  test("PATCH 400 - returns bad request if booleans are not booleans", async () => {
    const patchRequest = { is_opened: "skoo" };
    const id = await getItemID(Letter);
    const response = await request(app)
      .patch(`/api/letters/${id}`)
      .send(patchRequest)
      .expect(400);
    expect(response.body.message).toBe("bad request");
  });
  test("PATCH 400 - returns bad request if given an invalid id", async () => {
    const patchRequest = { is_opened: true };
    const id = await getItemID(Letter);
    const response = await request(app)
      .patch(`/api/letters/monkey`)
      .send(patchRequest)
      .expect(400);
    expect(response.body.message).toBe("bad request");
  });
  test("PATCH 404 - returns not found if given a valid id for a letter that does not exist", async () => {
    const patchRequest = { is_opened: true };
    const id = await getItemID(Letter);
    const response = await request(app)
      .patch(`/api/letters/999999999999999999999999`)
      .send(patchRequest)
      .expect(404);
    expect(response.body.message).toBe("letter not found");
  });
});

describe.only("send email notification", () => {
  test("POST: 200 with send mail", async () => {
    const name = "Sam";
    const recipient = "Upender";
    const res = await request(app)
      .post("/api/send-mail")
      .send({ to: "inkwell.notification.app@gmail.com", name, recipient })
      .expect(200);
    console.log(res.body.message);
  });
});
