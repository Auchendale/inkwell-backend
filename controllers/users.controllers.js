const { response } = require("../app.js");
const User = require("../models/users.js");

exports.getUsers = async (request, response, next) => {
  const users = await User.find();
  response.status(200).send({ users });
};

exports.getUserByUsername = async (request, response, next) => {
  const { username } = request.params;
  try {
    const user = await User.findOne({ username });
    if (!user) response.status(404).send({ message: "user does not exist" });
    else response.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

exports.patchUserByUsername = async (request, response, next) => {
  const { friend, remove } = request.body;
  const { username } = request.params;
  try {
    const friendExists = await User.findOne({username: friend})
    const userExists = await User.findOne({username})
    if (!friend || username === friend){
      response.status(400).send({message: "bad request"})
    }
    if (!friendExists || !userExists){
      response.status(404).send({message: "user not found"})
    }
    const userToPatch = await User.findOne({ username });
    const index = userToPatch.friends.indexOf(friend);
    if (!remove) {
      if (index > -1) {
        response.status(400).send({message: "user is already friend" });
      }      
      userToPatch.friends.push(friend);
      await userToPatch.save();
      response.status(200).send({ user: userToPatch });
    }
    if (index > -1) {
      userToPatch.friends.splice(index, 1);
    } else {
      response.status(400).send({message: "user is not friend" });
    }
    await userToPatch.save();
    response.status(200).send({ user: userToPatch });
  } catch (error) {
    next(error);
  }
};
