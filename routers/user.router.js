const userRouter = require("express").Router();
const {
  getUsers,
  getUserByUsername,
  patchUserByUsername,
} = require("../controllers/users.controllers");

userRouter.get("/", getUsers);

userRouter
  .route("/:username")
  .get(getUserByUsername)
  .patch(patchUserByUsername);

module.exports = userRouter;
