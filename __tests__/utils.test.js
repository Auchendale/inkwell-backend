const database = require("../db/connection.js");
const {getItemID} = require("../utils/get-item-id.js");
const Letter = require("../models/letters.js");

afterAll(async () => {
  await database.close();
});

describe("GET letter by ID", () => {
  test("Should return a string that relates to an existing letter within the database", async () => {
    const output = await getItemID(Letter);
    expect(output.length).toBe(24);
  });
});
