//const { mongoose } = require("mongoose");
const Letter = require("../models/letters.js");
const User = require("../models/users.js");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getLetterByLetterID = async (request, response, next) => {
  const { letter_id } = request.params;
  if (letter_id.length !== 24) {
    response.status(400).send({ message: "bad request" });
  } else {
    const id = new ObjectId(letter_id);
    const letter = await Letter.findById(id);
    if (!letter)
      response.status(404).send({ message: "letter does not exist" });
    else response.status(200).send({ letter });
  }
};

exports.postLetter = async (request, response, next) => {
  const { sender, recipient, content } = request.body;
  if (!sender || !recipient || !content) {
    response.status(400).send({ message: "bad request" });
  }
  try {
    const senderExists = await User.findOne({ username: sender });
    const recipientExists = await User.findOne({ username: recipient });

    if (!senderExists || !recipientExists) {
      response
        .status(404)
        .send({ message: "sender or recipient are not users" });
    }
    const letter = new Letter({ sender, recipient, content });
    const savedLetter = await letter.save();
    response.status(201).send({ letter });
  } catch (error) {
    next(error);
  }
};

exports.getAllLetters = async (request, response, next) => {
  const { sender, recipient, sort_by, order, is_opened, is_saved } =
    request.query;
  const sortFields = [
    "sender",
    "recipient",
    "date_sent",
    "is_opened",
    "is_saved",
  ];
  const orderFields = ["asc", "desc"];
  const boolFields = ["true", "false"];
  if (is_opened && !boolFields.includes(is_opened)) {
    response.status(400).send({ message: "bad request" });
  }
  if (is_saved && !boolFields.includes(is_saved)) {
    response.status(400).send({ message: "bad request" });
  }
  if (order && !orderFields.includes(order)) {
    response.status(400).send({ message: "bad request" });
  }
  let sortString = `-${sort_by}`;
  order === "asc" ? (sortString = sort_by) : null;
  if (sort_by && !sortFields.includes(sort_by)) {
    response.status(400).send({ message: "bad request" });
  }
  try {
    if (sender) {
      const senderExists = await User.findOne({ username: sender });
      if (!senderExists) {
        response.status(404).send({ message: "user not found" });
      }
    }
    if (recipient) {
      const recipientExists = await User.findOne({ username: recipient });
      if (!recipientExists) {
        response.status(404).send({ message: "user not found" });
      }
    }
    const letters = await Letter.find({})
      .where(sender ? { sender } : {})
      .where(recipient ? { recipient } : {})
      .where(is_opened ? { is_opened } : {})
      .where(is_saved ? { is_saved } : {})
      .sort(sort_by ? `${sortString}` : {});
    response.status(200).send({ letters });
  } catch (error) {
    next(error);
  }
};

exports.deleteLetterById = async (request, response, next) => {
  const { letter_id } = request.params;
  if (letter_id.length !== 24) {
    response.status(400).send({ message: "bad request" });}
    else{
      const id = new ObjectId(letter_id);
      try{
        const letterToDelete = await Letter.findByIdAndDelete(id)
        if(!letterToDelete){
          response.status(404).send({message: "letter not found"})
        }
        response.status(204).send()
    }
    catch (error){
      next(error)
    }
  }
};

exports.patchLetterById = async(request, response, next) => {
  const { is_opened } = request.body
  const { letter_id } = request.params;
  if(typeof is_opened !== "boolean" || letter_id.length !== 24){
    response.status(400).send({ message: "bad request" });
  }
  else{
    const id = new ObjectId(letter_id);
    try { 
      const letterToPatch = await Letter.findById(id);
      if(!letterToPatch){
        response.status(404).send({message: "letter not found"})
      }
      letterToPatch.is_opened = is_opened
      await letterToPatch.save()
      response.status(200).send({letter: letterToPatch})
    }
    catch (error){
      next(error)
    }
  }
}