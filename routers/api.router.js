const apiRouter = require("express").Router();
const userRouter = require("./user.router");
const endpoints = require("../endpoints.json");

apiRouter.get("/", (request, response) => {
  response.status(200).send({ endpoints });
});

apiRouter.use("/users", userRouter);

module.exports = apiRouter;
