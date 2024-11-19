const userRouter = require("express").Router();
const { getUsers } = require("../controllers/users.controllers");

userRouter.get("/", getUsers);

module.exports = userRouter;
