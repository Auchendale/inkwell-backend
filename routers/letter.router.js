const { getLetterByLetterID, postLetter } = require("../controllers/letters.controllers");

const letterRouter = require("express").Router();

letterRouter.get("/:letter_id", getLetterByLetterID);

letterRouter.post("/", postLetter)

module.exports = letterRouter;