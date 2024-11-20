const { getLetterByLetterID } = require("../controllers/letters.controllers");

const letterRouter = require("express").Router();

letterRouter.get("/:letter_id", getLetterByLetterID);

module.exports = letterRouter;