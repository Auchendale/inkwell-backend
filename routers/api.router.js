const apiRouter = require("express").Router();
const userRouter = require("./user.router");
const letterRouter = require("./letter.router");
const endpoints = require("../endpoints.json");

apiRouter.get("/", (request, response) => {
  response.status(200).send({ endpoints });
});

apiRouter.use("/users", userRouter);

apiRouter.use("/letters", letterRouter);

module.exports = apiRouter;
