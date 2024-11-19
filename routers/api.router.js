const apiRouter = require("express").Router();
const userRouter = require("./user.router");

apiRouter.use("/users", userRouter);

module.exports = apiRouter;
