const { mongoose } = require("mongoose");
const Letter = require("../models/letters.js");
const User = require("../models/users.js")
const ObjectId = require("mongoose").Types.ObjectId;

const getLetterByLetterID = async (request, response, next) => {
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

const postLetter = async (request, response, next) => {
  const { sender, recipient, content } = request.body
  if(!sender || !recipient || !content){
    response.status(400).send({message: "bad request"})
  }
  try {
    const senderExists = await User.findOne({ username: sender })
    const recipientExists = await User.findOne({ username: recipient })

    if(!senderExists || !recipientExists){
      response.status(404).send({message: "sender or recipient are not users"})
    }
    const letter = new Letter({ sender, recipient, content})
    const savedLetter = await letter.save()
    response.status(201).send({ letter })
  }
  catch (error) {
    next(error)
  }
}

module.exports = { getLetterByLetterID, postLetter };
