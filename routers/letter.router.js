const { getLetterByLetterID, postLetter, getAllLetters, deleteLetterById } = require("../controllers/letters.controllers");

const letterRouter = require("express").Router();

letterRouter
.route("/:letter_id")
.get(getLetterByLetterID)
.delete(deleteLetterById);

letterRouter
    .route('/')
    .post(postLetter)
    .get(getAllLetters)

module.exports = letterRouter;
