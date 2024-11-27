const apiRouter = require("express").Router();
const userRouter = require("./user.router");
const letterRouter = require("./letter.router");
const postRouter = require("./post.router");
const endpoints = require("../endpoints.json");
const emailRouter = require("./emailRouter");

apiRouter.get("/", (request, response) => {
  response.status(200).send({ endpoints });
});

apiRouter.use("/users", userRouter);

apiRouter.use("/letters", letterRouter);

apiRouter.use("/posts", postRouter);

apiRouter.use("/send-mail", emailRouter);

module.exports = apiRouter;
