const database = require("../db/connection.js");
const getLetterId = require("../utils/get-letter-id");

afterAll(async () => {
  await database.close();
});

describe("GET letter by ID", () => {
  test("Should return a string that relates to an existing letter within the database", async () => {
    const output = await getLetterId();
    expect(output.length).toBe(24);
  });
});
