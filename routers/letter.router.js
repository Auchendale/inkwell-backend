const { getLetterByLetterID, postLetter, getAllLetters, deleteLetterById, patchLetterById } = require("../controllers/letters.controllers");

const letterRouter = require("express").Router();

letterRouter
    .route("/:letter_id")
    .get(getLetterByLetterID)
    .delete(deleteLetterById)
    .patch(patchLetterById)

letterRouter
    .route('/')
    .post(postLetter)
    .get(getAllLetters)

module.exports = letterRouter;
