const userRouter = require("express").Router();
const {
  getUsers,
  getUserByUsername,
  patchUserByUsername,
} = require("../controllers/users.controllers");
const User = require("../models/users");

userRouter.get("/", getUsers);

userRouter
  .route("/:username")
  .get(getUserByUsername)
  .patch(patchUserByUsername);

  

module.exports = userRouter;
