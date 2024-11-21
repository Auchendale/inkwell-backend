const { getLetterByLetterID, postLetter, getAllLetters } = require("../controllers/letters.controllers");

const letterRouter = require("express").Router();

letterRouter.get("/:letter_id", getLetterByLetterID);

letterRouter
    .route('/')
    .post(postLetter)
    .get(getAllLetters)

module.exports = letterRouter;

// articlesRouter
//     .route('/')
//     .get(getAllArticles)
//     .post(postArticle)