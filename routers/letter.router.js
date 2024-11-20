const { getLetterByLetterID, postLetter, getLetterByRecipient } = require("../controllers/letters.controllers");

const letterRouter = require("express").Router();

letterRouter.get("/:letter_id", getLetterByLetterID);

letterRouter.post("/", postLetter)

letterRouter.get("/user/:recipient", getLetterByRecipient)

module.exports = letterRouter;